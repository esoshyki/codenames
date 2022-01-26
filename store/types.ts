import { AppState } from "./app/app.types";
import { UsersState } from "./users/users.types";
import { IGameState } from "./game/game.types";
import { ServerData } from "@/types";
import { ChatState } from "./chat/chat.types";

export interface IAction {
    type: string;
    payload?: any;
}

export interface IUser {
    userName: string;
}

export interface IChatMessage {
    message: string;
    user: IUser;
    id: number;
}

export interface IChatState {
    messages: IChatMessage[];
    hidden: boolean;
    users: IUser[];
    connected: boolean;
}

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
}

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
}

export interface IState {
    users: UsersState;
    chat: ChatState;
    game: IGameState;
    app: AppState;
    server: ServerData;
}
