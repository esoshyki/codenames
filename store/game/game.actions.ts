import { ReduxAction } from "@/types";
import { GameActions } from "./game.types";

export const startGameRequest = () : ReduxAction => ({
    type: GameActions.START_GAME_REQUEST
});
