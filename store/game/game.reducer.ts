import { IGameState, IAction } from "../types";
import { actions } from "./game.actions";

const initialState : IGameState = {
    readyUsers: [],
    blueLeader: null,
    redLeader: null,
    blueProposer: null,
    redProposer: null,
    field: null,
    ready: false,
    processing: false,
};

const gameReducer = (state = initialState, { type, payload } : IAction) : IGameState => {

    switch (type) {

        case actions.ADD_READY_USER:
            return ({
                ...state,
                readyUsers: [...state.readyUsers, payload]
            });

        case actions.REMOVE_READY_USER:
            return ({
                ...state,
                readyUsers: state.readyUsers.filter((user) => user.userName !== payload.userName)
            });

        case actions.SET_READY:
            return ({
                ...state,
                ready: payload
            });

        case actions.SET_PROCESSING:
            return ({
                ...state,
                processing: payload
            });

        default:
            return state;
    }
};

export default gameReducer;