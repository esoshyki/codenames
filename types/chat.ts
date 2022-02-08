import { IUser } from "./users";

export interface IMessage {
    author: IUser;
    text: string;
};

export interface IChat {
    messages: IMessage[],
    hidden: boolean;
};