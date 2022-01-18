import { IAction, IUser } from "../types";
import { actions } from "./user.actions";

const initialState = {
    user: null,
    users: []
};

const userReducer = (state=initialState, { type, payload } : IAction ) => {

    switch (type) {

        case actions.CREATE_USER:
            return ({
                ...state,
                user: payload,
                users: [...state.users, payload]
            });

        case actions.SET_LOGIN_ERROR: 
            return ({
                ...state,
                loginError: payload
            });

        case actions.DELETE_USER:
            const newUsers = state.users.filter((user: IUser) => user.id !== payload);

            return ({
                ...state,
                user: null,
                users: newUsers
            })

        default:
            return state

    }
};

export default userReducer;