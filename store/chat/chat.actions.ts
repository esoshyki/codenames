import { ReduxAction } from "@/types";
import { IMessage } from "@/types/chat";
import { actions } from "@/types/actions";

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