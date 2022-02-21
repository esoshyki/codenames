import { IUser } from "@/types/users";


export enum SServer {
    connected = "connected",
    updateOnlineUsers = "updateOnlineUsers",
    UpdateGameMembers = "updateGameMembers",
    ResetServerResponse = "ResetServerResponse",
}

export enum SClient {
    setSocketRequest = "setSocketRequest",
    setUserNameRequest = "setUserNameRequest",
    StartGameRequest = "startGameRequest",
    ResetServerData = "ResetServerData",
    UpdateGameMember = "UpdateGameMember",
};

export interface ServerToClient {
    [SServer.updateOnlineUsers]: (users: IUser[]) => void;
    [SServer.UpdateGameMembers]: (gameMembers: IUser[]) => void;
    [SServer.ResetServerResponse]: () => void;
};

export interface ClientToServer {
    [SClient.setSocketRequest]: (user: IUser) => void;
    [SClient.setUserNameRequest]: (userName?: string) => void;
    [SClient.StartGameRequest]: (user: IUser) => void;
    [SClient.ResetServerData]: () => void;
    [SClient.UpdateGameMember] : (user: IUser) => void;
};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    name: string;
    age: number;
    userName: string;
};

