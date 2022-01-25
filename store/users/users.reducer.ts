import { ReduxAction } from "@/types";
import { UsersState, UsersActions } from "./users.types";

const init : UsersState = {
    currentUser: null
};

export const usersReducer = (state = init, { type, payload } : ReduxAction) : UsersState => {

    switch(type) {

        case UsersActions.SET_CURRENT_USER:
            return ({
                ...state,
                currentUser: payload
            })

        default:
            return state
    }
};