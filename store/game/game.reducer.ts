import { IGameState } from "./game.types";
import { GameActions } from "./game.types";
import { ReduxAction } from "@/types";

const initialState: IGameState = {
    members: [],
    gameData: {
        guesserData: null,
        startSide: null,
        leaders: {
            blue: null,
            red: null,
        },
        fieldData: null,
        collection: null,
    
        round: {
            number: 1,
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
 

        default:
            return state;
    }
};

export default gameReducer;
