import { ReduxAction } from "@/types";
import { Actions } from "@/types/actions";
import { IGame } from "@/types/game";

const initialState: IGame = {
    redTeam: {
        members: [],
    },
    blueTeam: {
        members: [],
    },
    gameMembers: [],
    selectedCards: [],
    cardVotes: [],
};

const gameReducer = (state = initialState, { type, payload } : ReduxAction) : IGame => {

    switch (type) {

        case Actions.game.Reset:
            return {
                redTeam: {
                    members: [],
                },
                blueTeam: {
                    members: [],
                },
                gameMembers: [],
                selectedCards: [],
                cardVotes: []
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

        case Actions.game.SetRound:
            return {
                ...state,
                round: payload
            }

        case Actions.game.SetSelectedCards:
            return {
                ...state,
                selectedCards: payload
            }

        case Actions.game.SetMystery:
            return {
                ...state,
                mystery: payload
            }

        case Actions.game.SetWinnerVote:
            return {
                ...state,
                winnerVote: payload
            }

        default:
            return state
    }
}


export default gameReducer;
