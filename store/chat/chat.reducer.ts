import { IAction, IChatState } from "../types";
import { actions } from "./chat.actions";

const initialState: IChatState = {
    messages: [],
    hidden: true,
    users: [],
    connected: false
};

const chatReducer = (state = initialState, { type, payload }: IAction) => {
    switch (type) {
        case actions.ADD_CHAT_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload]
            };

        case actions.SET_CHAT_HIDDEN:
            return {
                ...state,
                hidden: payload
            };

        case actions.CHAT_USER_CONNECT:
            if (
                state.users.some((user) => user.userName === payload.userName)
            ) {
                return state;
            }
            return {
                ...state,
                users: [...state.users, payload]
            };

        case actions.CHAT_USER_DISCONNECT:
            return {
                ...state,
                users: state.users.filter(
                    (user) => user.userName !== payload.userName
                )
            };

        case actions.CHAT_SET_CONNECTED_STATUS:
            return {
                ...state,
                connected: payload
            };

        default:
            return state;
    }
};

export default chatReducer;
