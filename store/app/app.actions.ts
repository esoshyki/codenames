import { ReduxAction } from "@/types";
import { AppActions } from "./app.types";

export const showLoading = (): ReduxAction => ({
    type: AppActions.SHOW_LOADING
});

export const hideLoading = (): ReduxAction => ({
    type: AppActions.HIDE_LOADING
});

export const showLoginComponent = (): ReduxAction => ({
    type: AppActions.SHOW_LOGIN_COMPONENT
});

export const hideLoginComponent = (): ReduxAction => ({
    type: AppActions.HIDE_LOGIN_COMPONENT
});

export const showGameComponent = (): ReduxAction => ({
    type: AppActions.SHOW_GAME_COMPONENT
});

export const hideGameComponent = (): ReduxAction => ({
    type: AppActions.HIDE_LOGIN_COMPONENT
});

export const changeSocketIdRequest = (socketId: string): ReduxAction => ({
    type: AppActions.CHANGE_SOCKET_ID_REQUEST,
    payload: socketId
});

export const setSockedId = (socketId: string | null): ReduxAction => ({
    type: AppActions.SET_SOCKET_ID,
    payload: socketId
});

export const showInfo = (message: string) : ReduxAction => ({
    type: AppActions.SET_INFO,
    payload: message
});

export const hideInfo = () : ReduxAction => ({
    type: AppActions.SET_INFO,
    payload: null
});

export const setTimer = (timer: number | null) => ({
    type: AppActions.SET_TIMER,
    payload: timer
})
