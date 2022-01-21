import { IAction, IUser } from "../types";
import { store } from '../'
import { AnyAction, Dispatch } from "redux";

const LOGIN = "LOGIN";
const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
const LOGOUT = "LOGOUT";
const CLEAR_DISCONNECTED_USER = "CLEAR_DISCONNECTED_USER";
const SET_ONLINE_USERS = "SET_ONLINE_USERS";

export const actions = {
    LOGIN,
    SET_LOGIN_ERROR,
    LOGOUT,
    CLEAR_DISCONNECTED_USER,
    SET_ONLINE_USERS
};

export const login = (user: IUser): IAction => {

    return ({
        type: actions.LOGIN,
        payload: user
    })
};

export const setOnlineUsers = (users: IUser[]) : IAction  => {

    return ({
        type: actions.SET_ONLINE_USERS,
        payload: users
    })
}

export const clearDisconnectedUser = () : IAction => ({
    type: CLEAR_DISCONNECTED_USER,
})

export const logout = (user: IUser) : IAction => ({
        type: actions.LOGOUT,
        payload: user
    });

export const createLoginError = (error: string): IAction => ({
    type: SET_LOGIN_ERROR,
    payload: error
});

export const clearLoginError = (): IAction => ({
    type: SET_LOGIN_ERROR,
});