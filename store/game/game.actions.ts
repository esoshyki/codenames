import { ReduxAction } from "@/types";
import { Actions, IAction } from "@/types/actions";
import { IUser } from "@/types/users";

export const gameReset = () : ReduxAction => ({
    type: Actions.game.Reset
});

export const setGameMembers = (gameMembers: IUser[]) : IAction => ({
    type: Actions.game.SetGameMembers,
    payload: gameMembers
})

export const startGameRequest = () : IAction => ({
    type: Actions.game.StartGameRequest
})

export const updateGameMembersRequest = (gameMembers: IUser[]) : IAction => ({
    type: Actions.game.UpdateGameMembersRequest,
    payload: gameMembers
});



