import { IAction, IUser } from "../types";
import { AppTypes } from "./app.types";

export const setShowLogin = (value: boolean) : IAction => ({
    type: AppTypes.SET_SHOW_LOGIN,
    payload: value
});

export const showUserConnectedAd = (user: IUser) : IAction => ({
    type: AppTypes.SHOW_USER_CONNECTED_AD,
    payload: user.userName
});

export const hideUserConnectedAd = () : IAction => ({
    type: AppTypes.SHOW_USER_CONNECTED_AD,
    payload: null
});

export const showUserDisconnectedAd = (user: IUser) : IAction => ({
    type: AppTypes.SHOW_USER_DISCONNECTED_AD,
    payload: user.userName
});

export const hideUserDisconnectedAd = () : IAction => ({
    type: AppTypes.SHOW_USER_DISCONNECTED_AD,
    payload: null
}); 

export const updateOnlineUsersRequest = () : IAction => ({
    type: AppTypes.UPDATE_ONLINE_USERS_REQUEST
});

export const setSocketId = (socketId: string | null) : IAction => ({
    type: AppTypes.SET_SOCKET_ID,
    payload: socketId
});