import { ReduxAction, User } from "@/types";
import { UsersActions } from "./users.types";

export const loginRequest = (user: User) : ReduxAction => ({
    type: UsersActions.LOGIN_REQUEST,
    payload: user
});

export const logoutRequest = (user: User) : ReduxAction => ({
    type: UsersActions.LOGOUT_REQUEST,
    payload: user
});

export const setCurrentUser = (user: User) : ReduxAction => ({
    type: UsersActions.SET_CURRENT_USER,
    payload: user
});

export const setLoginError = (loginError?: string) : ReduxAction => ({
    type: UsersActions.SET_LOGIN_ERROR,
    payload: loginError
});