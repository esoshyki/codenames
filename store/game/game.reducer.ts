import { ReduxAction } from "@/types";
import { Actions } from "@/types/actions";
import { IGame, Sides } from "@/types/game";

const initialState: IGame = {
    field: {
        cards: []
    },
    redTeam: {
        members: [],
    },
    blueTeam: {
        members: [],
    },
    gameMembers: []
};

const gameReducer = (state = initialState, { type, payload } : ReduxAction) : IGame => {

    switch (type) {

        case Actions.game.Reset:
            return {
                field: {
                    cards: []
                },
                redTeam: {
                    members: [],
                },
                blueTeam: {
                    members: [],
                },
                gameMembers: []
            }

        case Actions.game.SetGameMembers:
            return {
                ...state,
                gameMembers: payload
            }

        case Actions.game.SetBlueTeam:
            return {
                ...state,
                blueTeam: {
                    ...state.blueTeam,
                    members: payload
                }
            }

        case Actions.game.SetRedTeam:
            return {
                ...state,
                redTeam: {
                    ...state.redTeam,
                    members: payload
                }
            }

        case Actions.game.SetField:
            return {
                ...state,
                field: payload
            }

        default:
            return state
    }
}


export default gameReducer;
