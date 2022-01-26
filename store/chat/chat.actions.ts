import { ReduxAction, User } from "@/types";
import { ChatMessage, ChatActions } from "./chat.types";

export const showChat = () : ReduxAction => ({
    type: ChatActions.SET_CHAT_HIDDEN,
    payload: false
});

export const hideChat = () : ReduxAction => ({
    type: ChatActions.SET_CHAT_HIDDEN,
    payload: true
});

export const addMessageRequest = (message: ChatMessage) : ReduxAction => ({
    type: ChatActions.ADD_MESSAGE_REQUEST,
    payload: message
});

export const addMessage = (message: ChatMessage) : ReduxAction => ({
    type: ChatActions.ADD_NEW_MESSAGE,
    payload: message
});