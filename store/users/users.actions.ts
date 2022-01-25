import { ReduxAction, User } from "@/types";
import { UsersActions } from "./users.types";

export const loginRequest = (userName: string): ReduxAction => ({
    type: UsersActions.LOGIN_REQUEST,
    payload: userName
});

export const logoutRequest = (userName: string): ReduxAction => ({
    type: UsersActions.LOGOUT_REQUEST,
    payload: userName
});

export const setCurrentUser = (user: User | null): ReduxAction => ({
    type: UsersActions.SET_CURRENT_USER,
    payload: user
});

export const setLoginError = (loginError?: string): ReduxAction => ({
    type: UsersActions.SET_LOGIN_ERROR,
    payload: loginError
});
