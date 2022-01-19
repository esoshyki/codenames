import { IAction, IUser, IUserState } from "../types";
import { actions } from "./user.actions";

const initialState : IUserState = {
    user: null,
    disconnectedUser: null
};

const userReducer = (state=initialState, { type, payload } : IAction ) => {

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
            })

        default:
            return state

    }
};

export default userReducer;