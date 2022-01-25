import { IUser } from "../store/types";
import { User } from ".";
import { SocketActions } from "./socket.actions";

interface SocketUser {
    userName: string;
    socketId: string;
}

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    user_disconnected: (users: IUser) => void;
    connect: (sockedId: string) => void;
    [SocketActions.CHANGE_ONLINE_USERS]: (users: User[]) => void;
    [SocketActions.USER_CONNECTED]: (user: User) => void;
    [SocketActions.USER_DISCONNECTED]: (user: User) => void;
}

export interface ClientToServerEvents {
    hello: () => void;
    user_socket_data: (user: SocketUser) => void;
    [SocketActions.LOGIN]: (user: SocketUser) => void;
    [SocketActions.LOGOUT] : (user: SocketUser) => void;
    [SocketActions.UPDATE_ONLINE_USERS_REQUEST] : () => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
    userName: string;
}