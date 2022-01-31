import { ReduxAction } from "@/types";
import { ChatState, ChatActions } from "./chat.types";

const initialState: ChatState = {
    messages: [],
    hidden: false,
};

const chatReducer = (state = initialState, { type, payload }: ReduxAction) : ChatState=> {

    switch (type) {
        
        case ChatActions.SET_CHAT_HIDDEN:
            return ({
                ...state,
                hidden: payload
            });

        case ChatActions.ADD_NEW_MESSAGE:
            return ({
                ...state,
                messages: [...state.messages, payload]
            });

        default:
            return state;
    }
};

export default chatReducer;
