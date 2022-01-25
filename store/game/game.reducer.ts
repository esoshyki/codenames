import { IAction } from "../types";
import { IGameState } from "./game.types";
import { GameActions } from "./game.types";

const initialState: IGameState = {
    members: [],
    blueLeader: null,
    redLeader: null,
    blueProposer: null,
    redProposer: null,
    guesserData: [],
    startSide: null,
    ready: false,
    processing: false,
    fieldData: null,
    collection: null,
    votedToStart: [],
    chosenCards: []
};

const gameReducer = (
    state = initialState,
    { type, payload }: IAction
): IGameState => {
    switch (type) {
        case GameActions.SET_GUESSER_DATA:
            return {
                ...state,
                guesserData: payload
            };

        case GameActions.SET_START_SIDE:
            return {
                ...state,
                startSide: payload
            };

        case GameActions.SET_COLLECTION:
            return {
                ...state,
                collection: payload
            };

        case GameActions.SET_FIELD_DATA:
            return {
                ...state,
                fieldData: payload
            };

        case GameActions.SET_MEMBERS:
            return {
                ...state,
                members: payload
            };

        case GameActions.SET_WANTED_TO_START:
            return {
                ...state,
                votedToStart: payload
            };

        default:
            return state;
    }
};

export default gameReducer;
