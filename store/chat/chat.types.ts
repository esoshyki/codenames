import { User } from "@/types";

export enum ChatActions {

    ADD_MESSAGE_REQUEST = "Chat/Add-Message-Request",
    ADD_NEW_MESSAGE = "Chat/Add-New-Message",
    SET_CHAT_HIDDEN = "Chat/Set-Chat-Hidden"
}

export interface ChatMessage {
    author: User;
    text: string;
};

export interface ChatState {
    messages: ChatMessage[];
    hidden: boolean;
};