import { IUser } from "@/types/users";


export enum SServer {
    connected = "connected",
    updateOneUserData = "updateOneUserData"
}

export enum SClient {
    setSocketRequest = "setSocketRequest",
    setUserNameRequest = "setUserNameRequest",
};

export interface ServerToClient {


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

