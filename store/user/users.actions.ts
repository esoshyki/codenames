import { IAction, IUser } from "../types";
import { UsersTypes } from "./users.types";

export const userConnect = (user: IUser) : IAction => ({
    type: UsersTypes.CONNECT,
    payload: user
});

export const userDisconnect = (user: IUser) : IAction => ({
    type: UsersTypes.DISCONNECT_REQUEST,
    payload: user
});

export const setUsersOnline = (users: IUser) : IAction => ({
    type: UsersTypes.SET_ONLINE_USERS,
    payload: users
});

export const setCurrentUser = (user: IUser) : IAction => ({
    type: UsersTypes.SET_CURRENT_USER,
    payload: user
});