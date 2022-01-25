import { IAction, IChatMessage, IUser } from "../types";

const ADD_CHAT_MESSAGE = "ADD_CHAT_MESSAGE";
const SET_CHAT_HIDDEN = "SET_CHAT_HIDDEN";
const CHAT_USER_CONNECT = "CHAT_USER_CONNECT";
const CHAT_USER_DISCONNECT = "CHAT_USER_DISCONNECT";
const CHAT_SET_CONNECTED_STATUS = "CHAT_SET_CONNECTED_STATUS";

export const actions = {
    ADD_CHAT_MESSAGE,
    SET_CHAT_HIDDEN,
    CHAT_USER_CONNECT,
    CHAT_USER_DISCONNECT,
    CHAT_SET_CONNECTED_STATUS
};

export const addUserToChat = (user: IUser): IAction => ({
    type: CHAT_USER_CONNECT,
    payload: user
});

export const removeUserFromChat = (user: IUser): IAction => ({
    type: CHAT_USER_DISCONNECT,
    payload: user
});

export const addChatMessage = (message: IChatMessage): IAction => ({
    type: actions.ADD_CHAT_MESSAGE,
    payload: message
});

export const hideChat = (): IAction => ({
    type: actions.SET_CHAT_HIDDEN,
    payload: true
});

export const showChat = (): IAction => ({
    type: actions.SET_CHAT_HIDDEN,
    payload: false
});

export const changeConnectionStatus = (status: boolean): IAction => ({
    type: actions.CHAT_SET_CONNECTED_STATUS,
    payload: status
});
