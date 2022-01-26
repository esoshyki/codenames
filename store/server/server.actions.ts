import { ReduxAction, User } from "@/types";
import { ServerActions } from "./server.types";
import { ServerData } from "./server.types";

export const setServerData = (serverData: ServerData): ReduxAction => ({
    type: ServerActions.SET_SERVER_DATA,
    payload: serverData
});

export const updateOnlineUsers = (newUsers: User[]): ReduxAction => ({
    type: ServerActions.SET_ONLINE_USERS,
    payload: newUsers
});

export const updateServerDataRequest = () : ReduxAction => ({
    type: ServerActions.UPDATE_SERVER_DATA_REQUEST
});

export const updateOnlineUsersRequest = (): ReduxAction => ({
    type: ServerActions.UPDATE_ONLINE_USERS_REQUEST
});
