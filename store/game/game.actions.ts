import { ReduxAction } from "@/types";
import { Actions, IAction } from "@/types/actions";
import { IUser } from "@/types/users";
import { Collection } from "@/utils/wordCollections";
import { CollectionVote, GameActions, GameStages, GuesserType, Mystery, RoundVote, Sides } from "./game.types";

export const startGameRequest = () : IAction => ({
    type: GameActions.START_GAME_REQUEST
})

export const setGameMembers = (gameMembers: IUser[]) : IAction => ({
    type: GameActions.SET_GAME_MEMBERS,
    payload: gameMembers
})

export const setTeamRequest = (side: Sides | null) : IAction => ({
    type: GameActions.StartGameRequest,
    payload: side
})

export const updateGameMembersRequest = (gameMembers: IUser[]) : IAction => ({
    type: GameActions.UpdateGameMembersRequest,
    payload: gameMembers
});

export const gameReset = () : ReduxAction => ({
    type: Actions.game.Reset
})


