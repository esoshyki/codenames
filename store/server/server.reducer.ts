import { SocketServerData } from "@/socket/socket.data";
import { ReduxAction } from "@/types";
import { ServerActions } from "./server.types";
import { ServerData } from "./server.types";

const initialState: ServerData = {
    processing: false,
    onlineUsers: []
};

export const serverDataReducer = (
    state = initialState,
    action: ReduxAction
): ServerData => {
    const { type, payload } = action;

    switch (type) {

        case ServerActions.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: payload
            };

        case ServerActions.SET_SERVER_DATA:

            const serverData: SocketServerData = payload;
            return {
                ...state,
                onlineUsers: serverData.onlineUsers
            };

        default:
            return state;
    }
};
