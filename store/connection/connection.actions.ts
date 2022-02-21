import { ReduxAction } from "@/types";
import { Actions, IAction } from "@/types/actions"
import { Sides } from "@/types/game";
import { IUser } from "@/types/users";

// SAGAS //

export const socketConnected = (payload: string) : IAction => ({
    type: Actions.connection.socketConnected,
    payload
});

export const userLogged = (userName: string) => ({
    type: Actions.connection.userLogged,
    payload: userName
});

export const socketDisconnected = () : IAction => ({
    type: Actions.connection.socketDisconnected
});

// REDUCER //

export const setUserName = (payload: IUser) => ({
    type: Actions.connection.setUserName,
    payload
});

export const setSocketId = (payload?: string) => ({
    type: Actions.connection.setSocketId,
    payload
});

export const updateOnlineUsers = (payload: IUser[]) => ({
    type: Actions.connection.updateOnlineUsers,
    payload
});

export const setConnectionError = (payload?: string) => ({
    type: Actions.connection.setError,
    payload
});

export const connectionReset = () : ReduxAction => ({
    type: Actions.connection.Reset
})

export const setCurrentUserTeam = (payload?: Sides) : IAction => ({
    type: Actions.connection.SetCurrentUserTeam,
    payload
});

export const SetCurrentUserLeader = (payload?: true) : IAction => ({
    type: Actions.connection.SetCurrentUserLeader,
    payload
})

export const setCurrentUserReady = (payload?: true) : IAction => ({
    type: Actions.connection.SetCurrentUserReady,
    payload
})

export const setCurrentUserCollectionVote = (payload?: number) : IAction => ({
    type: Actions.connection.SetCurrentUserCollectionVote,
    payload
})
