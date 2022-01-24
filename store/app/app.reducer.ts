import { AppState, AppTypes } from "./app.types";
import { IAction } from "../types";

const initialState : AppState = {
    showLogin: false,
    userConnectedAd: null,
    userDisconnectedAd: null,
    socketId: null,
    showGame: false,
};

export const appReducer = ( state = initialState, { type, payload } : IAction) : AppState => {

    switch (type) {

        case AppTypes.SET_SHOW_LOGIN:
            return ({
                ...state,
                showLogin: payload
            });

        case AppTypes.SHOW_USER_CONNECTED_AD:
            return ({
                ...state,
                userConnectedAd: payload
            });

        case AppTypes.SHOW_USER_DISCONNECTED_AD:
            return ({
                ...state,
                userDisconnectedAd: payload
            });

        case AppTypes.SET_SOCKET_ID:
            return ({
                ...state,
                socketId: payload
            });

        case AppTypes.SET_SHOW_GAME:
            return ({
                ...state,
                showGame: payload
            });

        default:
            return state;
    }
};