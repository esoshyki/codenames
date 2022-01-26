import { ReduxAction } from "@/types";
import { ServerActions } from "./server.types";
import { ServerData } from "./server.types";

const initialState: ServerData = {
    onlineUsers: [],
};

export const serverDataReducer = (
    state = initialState,
    action: ReduxAction
): ServerData => {
    const { type, payload } = action;

    switch (type) {
        case ServerActions.SET_SERVER_DATA:
            return payload;

        case ServerActions.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: payload
            };

        default:
            return state;
    }
};
