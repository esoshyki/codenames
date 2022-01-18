import { IAction } from "../types";
import { actions } from "./user.actions";

const initialState = {
    user: null,
    users: []
};

const userReducer = (state=initialState, { type, payload } : IAction ) => {

    switch (type) {

        case actions.CREATE_USER:
            return ({
                user: payload,
                users: [...state.users, payload.id]
            });

        default:
            return state

    }
};

export default userReducer;