import { IAction, IChatMessage } from "../types";

const ADD_CHAT_MESSAGE = "ADD_CHAT_MESSAGE";
const SET_CHAT_HIDDEN = "SET_CHAT_HIDDEN";

export const actions = {
    ADD_CHAT_MESSAGE,
    SET_CHAT_HIDDEN
};

export const addChatMessage = (message: IChatMessage) : IAction => ({
    type: actions.ADD_CHAT_MESSAGE,
    payload: message
});

export const hideChat = () : IAction => ({
    type: actions.SET_CHAT_HIDDEN,
    payload: true
});

export const showChat = () : IAction => ({
    type: actions.SET_CHAT_HIDDEN,
    payload: false
});