import { ReduxAction } from "@/types";
import { IMessage } from "@/types/chat";
import { Actions } from "@/types/actions";

const actions = Actions.chat;

export const showChat = () : ReduxAction => ({
    type: actions.setChatHidden,
    payload: false
});

export const hideChat = () : ReduxAction => ({
    type: actions.setChatHidden,
    payload: true
});

export const addChatMessageRequest = (payload: IMessage) : ReduxAction => ({
    type: actions.addChatMessageRequest,
    payload
});

export const addChatMessageResponse = (message: IMessage) : ReduxAction => ({
    type: actions.addChatMessageResponse,
    payload: message
});