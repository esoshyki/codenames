import { ReduxAction, User } from "@/types";
import { GameActions } from "./game.types";

export const startGameRequest = () : ReduxAction => ({
    type: GameActions.START_GAME_REQUEST
});

export const setGameMembers = (gameMembers: User[]) => ({
    type: GameActions.SET_GAME_MEMBERS,
    payload: gameMembers
})
