import { AppState, AppTypes } from "./app.types";
import { IAction } from "../types";

const initialState : AppState = {
    connected: false,
    showLogin: false,
};

export const appReducer = ( state = initialState, { type, payload } : IAction) : AppState => {

    switch (type) {

        case AppTypes.SET_CONNECTED_STATUS:
            return ({
                ...state,
                connected: payload
            });

        case AppTypes.SET_SHOW_LOGIN:
            return ({
                ...state,
                showLogin: payload
            });

        default:
            return state;
    }
};