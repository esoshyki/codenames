import { User } from "@/types";
import { SocketClient } from "./socket.types";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { io } from "socket.io-client";
import { setSockedId, setTimer } from "@/store/app/app.actions";
import { updateServerDataRequest } from "@/store/server/server.actions";
import { SocketServer } from "./socket.types";
import { updateOnlineUsers, setServerData } from "@/store/server/server.actions";
import { showInfo } from "@/store/app/app.actions";
import { ChatMessage } from "@/store/chat/chat.types";
import { addMessage } from "@/store/chat/chat.actions";
import { CollectionVote, GameStages, GuesserType, InGameUser, Sides } from "@/store/game/game.types";
import { setCollection, setCollectionVotes, setFieldData, setGameMembers, setGameStage, setGuesserData } from "@/store/game/game.actions";
import { Collection } from "@/utils/wordCollections";
import { SocketServerData } from "./socket.data";

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

    socket.on(SocketServer.CHANGE_ONLINE_USERS, (users: User[]) => {
        dispatch(updateOnlineUsers(users));
    });

    socket.on(SocketServer.UPDATE_SERVER_DATA_RESPONSE, (serverData: SocketServerData) => {
        dispatch(setServerData(serverData));
    })

    socket.on(SocketServer.LOGIN_RESPONSE, (user: User) => {
        dispatch(showInfo(`${user.userName} connected`));
    });

    socket.on(SocketServer.ADD_MESSAGE_RESPONSE, (message: ChatMessage) => {
        dispatch(addMessage(message));
    });

    socket.on(SocketServer.START_GAME_RESPONSE, (gameMembers: InGameUser[]) => {
        dispatch(setGameMembers(gameMembers));
    });

    socket.on(SocketServer.UPDATE_GAME_MEMBERS, (gameMembers: InGameUser[]) => {
        dispatch(setGameMembers(gameMembers))
    });

    socket.on(SocketServer.UPDATE_COLLECTION_VOTES, (votes: CollectionVote[]) => {
        dispatch(setCollectionVotes(votes))
    });

    socket.on(SocketServer.SET_COLLECTION, (collection: Collection) => {
        dispatch(setCollection(collection))
    });

    socket.on(SocketServer.UPDATE_FIELD_DATA, (words: string[]) => {
        dispatch(setFieldData(words));
    });

    socket.on(SocketServer.UPDATE_GUESSER_DATA, (guesserData: GuesserType) => {
        dispatch(setGuesserData(guesserData))
    });

    socket.on(SocketServer.SET_GAME_STAGE, (gameStage: GameStages) => {
        dispatch(setGameStage(gameStage))
    });

    socket.on(SocketServer.SET_TIMER, (timer: number | null) => {
        dispatch(setTimer(timer));
    })
};

const startGameRequest = (user: User) => {
    socket.emit(SocketClient.START_GAME_REQUEST, user);
};

const setTeamRequest = (user: User, side: Sides | null) => {
    socket.emit(SocketClient.SET_TEAM_REQUEST, user, side)
};

const setLeaderRequest = (user: User) => {
    socket.emit(SocketClient.SET_LEADER_REQUEST, (user))
};

const toggleReadyRequest = (userName: string) => {
    socket.emit(SocketClient.TOGGLE_READY_REQUEST, userName)
};

const toogleCollectionVoteRequest = (userName: string, collectionIdx: number) => {
    socket.emit(SocketClient.TOOGLE_COLLECTION_VOTE_REQUEST, userName, collectionIdx);
};

const clientSocket = {
    startGameRequest,
    setTeamRequest,
    setLeaderRequest,
    toggleReadyRequest,
    toogleCollectionVoteRequest
};

export default clientSocket;
