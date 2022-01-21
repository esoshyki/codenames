import { IUserState, UsersTypes } from "./users.types";
import { IAction } from "../types";

const init : IUserState = {
    user: null,
    usersOnline: []
};

export const usersReducer = (
    state = init, { type, payload } : IAction
    ) : IUserState => {

    switch(type) {

        case UsersTypes.SET_CURRENT_USER:
            return ({
                ...state,
                user: payload
            });

        case UsersTypes.SET_ONLINE_USERS:
            return ({
                ...state,
                usersOnline: payload
            });

        default:
            return state
    }
}