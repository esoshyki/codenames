import { IApp } from "./app";
import { IChat } from "./chat";
import { IGame } from "./game";

export interface ReduxAction {
    type: string;
    payload?: any;
}

export interface APIResponse {
    data?: any;
    error?: string;
}

export interface IState {
    app: IApp;
    game: IGame;
    chat: IChat;
} 