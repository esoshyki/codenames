import { ReduxAction } from "@/types";
import { IGame, Sides } from "@/types/game";
import { actions } from "@/types/actions";

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
};

const gameReducer = (state = initialState, { type, payload } : ReduxAction) => {

    switch (type) {

        default:
            return state
    }
}


export default gameReducer;
