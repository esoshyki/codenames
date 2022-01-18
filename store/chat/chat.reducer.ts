import { IAction, IChatState } from "../types";
import { actions } from "./chat.actions";

const initialState : IChatState = {
    messages: [],
    hidden: true
};

const chatReducer = (state=initialState, { type, payload } : IAction ) => {

    switch (type) {

        case actions.ADD_CHAT_MESSAGE:
            return ({
                ...state,
                messages: [...state.messages, payload]
            });

        case actions.SET_CHAT_HIDDEN:
            return ({
                ...state,
                hidden: payload
            });

        default:
            return state
    }
};

export default chatReducer;