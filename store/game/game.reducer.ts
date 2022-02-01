import { GameStages, IGameState } from "./game.types";
import { GameActions } from "./game.types";
import { ReduxAction } from "@/types";
import { SocketServerData } from "@/socket/socket.data";

const initialState: IGameState = {
    gameMembers: [],
    gameData: {
        guesserData: null,
        startSide: null,
        fieldData: null,
        fieldPicks: [],
        collection: null,
        collectionVotes: [],
        stage: GameStages.noGame,
        round: {
            number: 1,
            votes: [],
            mystery: null
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
                    stage: payload
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

        case GameActions.SET_SERVER_DATA:

            const serverData : SocketServerData = payload;

            return ({
                ...state,
                gameData: {...serverData.gameData},
                gameMembers: [...serverData.gameMembers]
            });

        case GameActions.SET_MISTERY:
            return ({
                ...state,
                gameData: {
                    ...state.gameData,
                    round: {
                        ...state.gameData.round,
                        mystery: payload
                    }
                }
            })

        default:
            return state;
    }
};

export default gameReducer;
