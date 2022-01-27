import { User } from "@/types";
import { SocketClientActions } from "@/types/socket.actions";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { io } from "socket.io-client";
import { setSockedId } from "@/store/app/app.actions";
import { updateServerDataRequest } from "@/store/server/server.actions";
import { SocketServerActions } from "@/types/socket.actions";
import { updateOnlineUsers, setServerData } from "@/store/server/server.actions";
import { ServerData } from "@/types";
import { showInfo } from "@/store/app/app.actions";
import { ChatMessage } from "@/store/chat/chat.types";
import { addMessage } from "@/store/chat/chat.actions";

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
}

const startGameRequest = (user: User) => {
    socket.emit(SocketClientActions.START_GAME_REQUEST, user);
}

const clientSocket = {
    startGameRequest
};

export default clientSocket;
