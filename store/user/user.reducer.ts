import { IAction, IUser, IUserState } from "../types";
import { actions } from "./user.actions";

const initialState : IUserState = {
    user: null,
    disconnectedUser: null,
    onlineUsers: []
};

const userReducer = (
    state=initialState, { type, payload } : IAction 
    ) : IUserState => {

    switch (type) {

        case actions.LOGIN:
            return ({
                ...state,
                user: payload,
            });

        case actions.SET_LOGIN_ERROR: 
            return ({
                ...state,
                loginError: payload
            });

        case actions.LOGOUT:

            return ({
                ...state,
                user: null,
                disconnectedUser: payload
            });

        case actions.CLEAR_DISCONNECTED_USER:

            return ({
                ...state,
                disconnectedUser: null
            });

        case actions.SET_ONLINE_USERS:

            return ({
                ...state,
                onlineUsers: payload
            })

        default:
            return state

    }
};

export default userReducer;