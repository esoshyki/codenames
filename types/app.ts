import { Locales } from "translate/locales";

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
    locale: Locales,
    stage: AppStages;
    error?: IError;
    systemInfo: ISystemInfo;
}