import { ReduxAction } from "@/types";
import { Actions } from "@/types/actions";
import { IGame, Sides } from "@/types/game";

const initialState: IGame = {
    field: {
        cards: []
    },
    redTeam: {
        members: [],
        side: Sides.red
    },
    blueTeam: {
        members: [],
        side: Sides.blue
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
                    side: Sides.red
                },
                blueTeam: {
                    members: [],
                    side: Sides.blue
                },
                gameMembers: []
            }

        default:
            return state
    }
}


export default gameReducer;
