import { UserState, UserActions } from "./users.types";
import { IAction } from "../types";

const init : UserState = {
    user: null,
    usersOnline: [],
    loginError: null,
    processing: false,
};

export const usersReducer = (
    state = init, { type, payload } : IAction
    ) : UserState => {

    switch(type) {

        case UserActions.SET_SOCKET_ID:
            return ({
                ...state,
                user: {
                    userName: state?.user?.userName || null,
                    socketId: payload
                }
            });

        case UserActions.SET_LOGIN_ERROR:
            return ({
                ...state,
                loginError: payload
            });

        case UserActions.SET_PROCESSING:
            return ({
                ...state,
                processing: payload
            });

        case UserActions.SET_USERNAME:
            return ({
                ...state,
                user: {
                    socketId: state?.user?.socketId || null,
                    userName: payload
                }
            })

        default:
            return state
    }
}