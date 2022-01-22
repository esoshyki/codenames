import { IAction } from "../types";
import { AppTypes } from "./app.types";

export const setConnectionStatus = (value: boolean) : IAction => ({
    type: AppTypes.SET_CONNECTED_STATUS,
    payload: value
});

export const setShowLogin = (value: boolean) : IAction => ({
    type: AppTypes.SET_SHOW_LOGIN,
    payload: value
});

export const updateOnlineUsersRequest = () : IAction => ({
    type: AppTypes.UPDATE_ONLINE_USERS_REQUEST
});
