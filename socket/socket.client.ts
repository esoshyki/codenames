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
import { InGameUser, Sides } from "@/store/game/game.types";
import { setGameMembers } from "@/store/game/game.actions";

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
        dispatch(setGameMembers(gameMembers))
    });
}

const startGameRequest = (user: User) => {
    socket.emit(SocketClientActions.START_GAME_REQUEST, user);
};

const setTeamRequest = (user: User, side: Sides | null) => {
    socket.emit(SocketClientActions.SET_TEAM_REQUEST, user, side)
}

const clientSocket = {
    startGameRequest,
    setTeamRequest
};

export default clientSocket;
