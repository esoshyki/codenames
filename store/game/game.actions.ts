import { ReduxAction } from "@/types";
import { Actions, IAction } from "@/types/actions";
import { Sides } from "@/types/game";
import { IUser } from "@/types/users";

export const gameReset = () : ReduxAction => ({
    type: Actions.game.Reset
});

export const setGameMembers = (gameMembers: IUser[]) : IAction => ({
    type: Actions.game.SetGameMembers,
    payload: gameMembers
});

export const setRedTeam = (members: IUser[]) : IAction => ({
    type: Actions.game.SetRedTeam,
    payload: members
});

export const setBlueTeam = (members: IUser[]) : IAction => ({
    type: Actions.game.SetBlueTeam,
    payload: members
});

export const startGameRequest = () : IAction => ({
    type: Actions.game.StartGameRequest
})

export const updateGameMembersRequest = (gameMembers: IUser[]) : IAction => ({
    type: Actions.game.UpdateGameMembersRequest,
    payload: gameMembers
});

export const toggleTeamRequest = (side?: Sides) : IAction => ({
    type: Actions.game.ToggleTeamRequest,
    payload: side
})

export const toggleLeaderRequest = () : IAction => ({
    type: Actions.game.ToggleLeaderRequest
})



