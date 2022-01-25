import { ReduxAction } from "@/types";
import { UserActions } from "./users.types";

export const setSockedId = (socketId: string) : ReduxAction => ({
    type: UserActions.SET_SOCKET_ID,
    payload: socketId
});

export const setLoginError = (value: string | null) : ReduxAction => ({
    type: UserActions.SET_LOGIN_ERROR,
    payload: value
});

export const setProcessing = (value: boolean) : ReduxAction => ({
    type: UserActions.SET_PROCESSING,
    payload: value
});

export const setUserName = (userName: string) : ReduxAction => ({
    type: UserActions.SET_USERNAME,
    payload: userName
});