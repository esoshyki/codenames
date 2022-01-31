import { User } from "@/types";
import { SocketClientActions } from "./socket.types";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { io } from "socket.io-client";
import { setSockedId } from "@/store/app/app.actions";
import { updateServerDataRequest } from "@/store/server/server.actions";
import { SocketServerActions } from "./socket.types";
import { updateOnlineUsers, setServerData } from "@/store/server/server.actions";
import { ServerData } from "@/types";
import { showInfo } from "@/store/app/app.actions";
import { ChatMessage } from "@/store/chat/chat.types";
import { addMessage } from "@/store/chat/chat.actions";
import { CollectionVote, GameStages, GuesserType, InGameUser, Sides } from "@/store/game/game.types";
import { setCollection, setCollectionVotes, setFieldData, setGameMembers, setGameStage, setGuesserData } from "@/store/game/game.actions";
import { Collection } from "@/utils/wordCollections";

export const socket = io(
    process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    {
        path: "/api/socket"
    }
);

export const connectSocket = (dispatch: Dispatch<AnyAction>) => {
    socket.on("connect", () => {
        dispatch(setSockedId(socket.id));
        dispatch(updateServerDataRequest());
    });

    socket.on(SocketServerActions.CHANGE_ONLINE_USERS, (users: User[]) => {
        dispatch(updateOnlineUsers(users));
    });

    socket.on(SocketServerActions.UPDATE_SERVER_DATA_RESPONSE, (serverData: ServerData) => {
        dispatch(setServerData(serverData));
    })

    socket.on(SocketServerActions.LOGIN_RESPONSE, (user: User) => {
        dispatch(showInfo(`${user.userName} connected`));
    });

    socket.on(SocketServerActions.ADD_MESSAGE_RESPONSE, (message: ChatMessage) => {
        dispatch(addMessage(message));
    });

    socket.on(SocketServerActions.START_GAME_RESPONSE, (gameMembers: InGameUser[]) => {
        dispatch(setGameMembers(gameMembers));
    });

    socket.on(SocketServerActions.UPDATE_GAME_MEMBERS, (gameMembers: InGameUser[]) => {
        dispatch(setGameMembers(gameMembers))
    });

    socket.on(SocketServerActions.UPDATE_COLLECTION_VOTES, (votes: CollectionVote[]) => {
        dispatch(setCollectionVotes(votes))
    });

    socket.on(SocketServerActions.SET_COLLECTION, (collection: Collection) => {
        dispatch(setCollection(collection))
    });

    socket.on(SocketServerActions.UPDATE_FIELD_DATA, (words: string[]) => {
        dispatch(setFieldData(words));
    });

    socket.on(SocketServerActions.UPDATE_GUESSER_DATA, (guesserData: GuesserType) => {
        dispatch(setGuesserData(guesserData))
    });

    socket.on(SocketServerActions.SET_GAME_STAGE, (gameStage: GameStages) => {
        console.log("setGameStage");
        dispatch(setGameStage(gameStage))
    });
}

const startGameRequest = (user: User) => {
    socket.emit(SocketClientActions.START_GAME_REQUEST, user);
};

const setTeamRequest = (user: User, side: Sides | null) => {
    socket.emit(SocketClientActions.SET_TEAM_REQUEST, user, side)
};

const setLeaderRequest = (user: User) => {
    socket.emit(SocketClientActions.SET_LEADER_REQUEST, (user))
};

const toggleReadyRequest = (userName: string) => {
    socket.emit(SocketClientActions.TOGGLE_READY_REQUEST, userName)
};

const toogleCollectionVoteRequest = (userName: string, collectionIdx: number) => {
    socket.emit(SocketClientActions.TOOGLE_COLLECTION_VOTE_REQUEST, userName, collectionIdx);
};

const clientSocket = {
    startGameRequest,
    setTeamRequest,
    setLeaderRequest,
    toggleReadyRequest,
    toogleCollectionVoteRequest
};

export default clientSocket;
