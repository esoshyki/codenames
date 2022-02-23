import { IMessage } from "@/types/chat";
import { Actions, IAction } from "@/types/actions";

const actions = Actions.chat;

export const showChat = () : IAction => ({
    type: actions.setChatHidden,
    payload: false
});

export const hideChat = () : IAction => ({
    type: actions.setChatHidden,
    payload: true
});

export const addChatMessageRequest = (payload: IMessage) : IAction => ({
    type: actions.addChatMessageRequest,
    payload
});

export const addChatMessageResponse = (message: IMessage) : IAction => ({
    type: actions.addChatMessageResponse,
    payload: message
});

export const addMessage = (payload: IMessage) : IAction => ({
    type: actions.AddMessage,
    payload
})

export const removeMessage = (id: string) : IAction => ({
    type: actions.RemoveMessage,
    payload: id
})