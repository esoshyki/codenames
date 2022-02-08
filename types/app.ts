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

export interface IApp {
    stage: AppStages;
    usersOnline: IUser[];
    socketId: string;
    currentUser?: IUser;
    error?: IError;
}