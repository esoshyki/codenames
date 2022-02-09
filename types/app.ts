import { IUser } from "./users";

export enum AppStages {
    nogame = "nogame",
    prestart = "prestart",
    game = "game",
    finished = "finished"
};

export interface IError {
    message: string
};

export interface ISystemInfo {
    version: string;
    connectionStatus: "connected" | "disconnected";
}

export interface IApp {
    stage: AppStages;
    usersOnline: IUser[];
    currentUser: IUser;
    error?: IError;
    systemInfo: ISystemInfo;
}