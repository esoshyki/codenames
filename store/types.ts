import { AppState } from "./app/app.types";
import { IUserState } from "./user/users.types";

export interface IAction {
    type: string;
    payload?: any;
};

export interface IUser {
    userName: string;
};

export interface IChatMessage {
    message: string;
    user: IUser;
    id: number;
};

export interface IChatState {
    messages: IChatMessage[];
    hidden: boolean;
    users: IUser[];
    connected: boolean;
};

export enum cardType {
    red = "red",
    blue = "blue",
    white = "white",
    black = "black"
}

export interface ICard {
    word: string;
    position: number;
    type: cardType;
    pushed: boolean;
};

export interface IFBUserData {
    userName: string;
    socketId: string;
}

export interface IGameField {
    cardlist: ICard[];
    blackIdx: number;
    whitelist: number[];
    redlist: number[];
    bluelist: number[];
};

export interface IGameState {
    readyUsers: IUser[];
    redLeader: IUser | null;
    blueLeader: IUser | null;
    redProposer: IUser | null;
    blueProposer: IUser | null;
    field: IGameField | null;
    ready: boolean;
    processing: boolean;
}

export interface IState {
    user: IUserState;
    chat: IChatState;
    game: IGameState;
    app: AppState;
};