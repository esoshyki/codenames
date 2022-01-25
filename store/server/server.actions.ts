import { ReduxAction, ServerData, User } from "@/types";
import { ServerActions } from "./server.types";



export const updateServerData = (serverData: ServerData) : ReduxAction => ({
    type: ServerActions.UPDATE_SERVER_DATA,
    payload: serverData
});

export const updateOnlineUsers = (newUsers: User[]) : ReduxAction => ({
    type: ServerActions.UPDATE_ONLINE_USERS,
    payload: newUsers
});

export const updateOnlineUsersRequest = () : ReduxAction => ({
    type: ServerActions.UPDATE_ONLINE_USERS_REQUEST,
})