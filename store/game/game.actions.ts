import { ReduxAction } from "@/types";
import { Actions, IAction } from "@/types/actions";
import { IField, IMystery, IRound, Sides } from "@/types/game";
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

export const toggleReadyRequest = () : IAction => ({
    type: Actions.game.ToggleReadyRequest
})

export const toggleCollectionVoteRequest = (collectionId: number) : IAction => ({
    type: Actions.game.ToggleCollectionVoteRequest,
    payload: collectionId
});

export const allReadyRequest = () : IAction => ({
    type: Actions.game.AllReadyRequest
})

export const setFieldRequest = (field: IField) : IAction => ({
    type: Actions.game.SetFieldRequest,
    payload: field
})

export const setField = (field: IField) : IAction => ({
    type: Actions.game.SetField,
    payload: field
})

export const setRound = (round?: IRound) : IAction => ({
    type: Actions.game.SetRound,
    payload: round
})

export const setSelectedCards = (payload: number[]) : IAction => ({
    type: Actions.game.SetSelectedCards,
    payload
})

export const makeMysteryRequest = (payload: { keyword: string, selectedItems: number[]}) => ({
    type: Actions.game.MakeMysteryRequest,
    payload
})

export const setMystery = (payload?: IMystery) => ({
    type: Actions.game.SetMystery,
    payload
})

export const makeVoteRequest = (cardNumber: number) => ({
    type: Actions.game.MakeVoteRequest,
    payload: cardNumber
})

export const allVotesDoneRequest = (winner: number) => ({
    type: Actions.game.AllVotesDoneRequest,
    payload: winner
});

export const setWinnerVote = (winner?: number) => ({
    type: Actions.game.SetWinnerVote,
    payload: winner
})

export const makePassVotes = () => ({
    type: Actions.game.MakePassRequest
})
