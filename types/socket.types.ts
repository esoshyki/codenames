import { User } from ".";
import { SocketClientActions, SocketServerActions } from "./socket.actions";
import { ServerData } from '@/store/server/server.types';
import { ChatMessage } from "@/store/chat/chat.types";

interface SocketUser {
    userName: string;
    socketId: string;
};

export interface LoginResponse {
    user?: User,
    error?: string
}


export interface ServerToClientEvents {
    connect: (sockedId: string) => void;
    [SocketServerActions.CHANGE_ONLINE_USERS]: (users: User[]) => void;
    [SocketServerActions.LOGIN_RESPONSE]: (user: User) => void;
    [SocketServerActions.LOGOUT_RESPONSE]: (user: User) => void;
    [SocketServerActions.UPDATE_SERVER_DATA_RESPONSE] : (serverData: ServerData) => void;
    [SocketServerActions.ADD_MESSAGE_RESPONSE]: (message: ChatMessage) => void;
}

export interface ClientToServerEvents {
    [SocketClientActions.LOGIN_REQUEST]: (user: SocketUser) => void;
    [SocketClientActions.LOGOUT_REQUEST]: (user: SocketUser) => void;
    [SocketClientActions.UPDATE_ONLINE_USERS_REQUEST]: () => void;
    [SocketClientActions.UPDATE_SERVER_DATA_REQUEST]: () => void;
    [SocketClientActions.ADD_MESSAGE_REQUEST]: (message: ChatMessage) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
    userName: string;
}
