import { ReduxAction, User } from "@/types";
import { GameActions, Sides } from "./game.types";

export const startGameRequest = () : ReduxAction => ({
    type: GameActions.START_GAME_REQUEST
});

export const setGameMembers = (gameMembers: User[]) => ({
    type: GameActions.SET_GAME_MEMBERS,
    payload: gameMembers
});

export const setTeamRequest = (side: Sides | null) => ({
    type: GameActions.SET_TEAM_REQUEST,
    payload: side
});

export const setLeaderRequest = () => ({
    type: GameActions.SET_LEADER_REQUEST,
})
