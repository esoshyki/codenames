import { User } from ".";
import { SocketClientActions, SocketServerActions } from "./socket.actions";

interface SocketUser {
    userName: string;
    socketId: string;
}

export interface ServerToClientEvents {
    connect: (sockedId: string) => void;
    [SocketServerActions.CHANGE_ONLINE_USERS]: (users: User[]) => void;
    [SocketServerActions.USER_CONNECTED]: (user: User) => void;
    [SocketServerActions.USER_DISCONNECTED]: (user: User) => void;
}

export interface ClientToServerEvents {
    [SocketClientActions.LOGIN]: (user: SocketUser) => void;
    [SocketClientActions.LOGOUT]: (user: SocketUser) => void;
    [SocketClientActions.UPDATE_ONLINE_USERS_REQUEST]: () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
    userName: string;
}
