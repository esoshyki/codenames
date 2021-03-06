import { Locales } from "translate/locales";

export enum AppStages {
    nogame = "nogame",
    prestart = "prestart",
    CollectionVote = "collectionVote",
    game = "game",
    finished = "finished",
};

export interface IError {
    message: string
};

export interface ISystemInfo {
    version: string;
    connectionStatus: "connected" | "disconnected";
}

export enum LayoutEffects {
    Hide = "Hide",
    Show = "Show",
}

export interface IApp {
    locale: Locales,
    stage: AppStages;
    error?: IError;
    systemInfo: ISystemInfo;
    layoutEffect?: LayoutEffects
}