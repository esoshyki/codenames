import { GameStages, IGameState } from "./game.types";
import { GameActions } from "./game.types";
import { ReduxAction } from "@/types";

const initialState: IGameState = {
    gameMembers: [],
    gameData: {
        guesserData: null,
        startSide: null,
        fieldData: null,
        collection: null,
        collectionVotes: [],
        stage: {
            round: GameStages.noGame,
            side: null,
            votes: []
        }
    }
};

const gameReducer = (
    state = initialState,
    { type, payload }: ReduxAction
): IGameState => {
    switch (type) {
 
        case GameActions.SET_GAME_MEMBERS:
            return ({
                ...state,
                gameMembers: payload
            });

        case GameActions.SET_STAGE:
            return ({
                ...state,
                gameData: {
                    ...state.gameData,
                    stage: {
                        ...state.gameData.stage,
                        round: payload
                    }
                }
            });

        case GameActions.SET_COLLECTION_VOTES:
            return ({
                ...state,
                gameData: {
                    ...state.gameData,
                    collectionVotes: payload
                }
            });

        case GameActions.SET_COLLECTION:
            return ({
                ...state,
                gameData: {
                    ...state.gameData,
                    collection: payload
                }
            });

        case GameActions.SET_FIELD_DATA:
            return ({
                ...state,
                gameData: {
                    ...state.gameData,
                    fieldData: payload
                }
            });

        case GameActions.SET_GUESSER_DATA:
            return ({
                ...state,
                gameData: {
                    ...state.gameData,
                    guesserData: payload
                }
            });


        default:
            return state;
    }
};

export default gameReducer;
