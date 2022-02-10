import { IUser } from "@/types/users";


export enum SServer {
    connected = "connected",
    updateOnlineUsers = "updateOnlineUsers"
}

export enum SClient {
    setSocketRequest = "setSocketRequest",
    setUserNameRequest = "setUserNameRequest",
};

export interface ServerToClient {
    [SServer.updateOnlineUsers]: (users: IUser[]) => void;
};

export interface ClientToServer {
    [SClient.setSocketRequest]: (user: IUser) => void;
    [SClient.setUserNameRequest]: (userName?: string) => void;

};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    name: string;
    age: number;
    userName: string;
};

