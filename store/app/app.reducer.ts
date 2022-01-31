import { AppState, AppActions } from "./app.types";
import { IAction } from "../types";

const initialState: AppState = {
    showLogin: false,
    socketId: null,
    showGame: false,
    processing: false,
    info: null,
    timer: null
};

export const appReducer = (
    state = initialState,
    { type, payload }: IAction
): AppState => {
    switch (type) {
        case AppActions.SHOW_LOADING:
            return {
                ...state,
                processing: true
            };

        case AppActions.HIDE_LOADING:
            return {
                ...state,
                processing: false
            };

        case AppActions.SHOW_LOGIN_COMPONENT:
            return {
                ...state,
                showLogin: true
            };

        case AppActions.HIDE_LOGIN_COMPONENT:
            return {
                ...state,
                showLogin: false
            };

        case AppActions.SHOW_GAME_COMPONENT:
            return {
                ...state,
                showGame: true
            };

        case AppActions.HIDE_GAME_COMPONENT:
            return {
                ...state,
                showGame: false
            };

        case AppActions.SET_SOCKET_ID:
            return {
                ...state,
                socketId: payload
            };

        case AppActions.SET_INFO:
            return ({
                ...state,
                info: payload
            });

        case AppActions.SET_TIMER:
            return ({
                ...state,
                timer: payload
            });

        default:
            return state;
    }
};
