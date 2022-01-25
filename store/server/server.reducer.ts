import { ServerData, ReduxAction } from "@/types";
import { ServerActions } from "./server.types";

const initialState: ServerData = {
    onlineUsers: [],
    gameData: {
        members: []
    }
};

export const serverDataReducer = (
    state = initialState,
    action: ReduxAction
): ServerData => {
    const { type, payload } = action;

    switch (type) {
        case ServerActions.UPDATE_SERVER_DATA:
            return payload;

        case ServerActions.UPDATE_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: payload
            };

        default:
            return state;
    }
};
