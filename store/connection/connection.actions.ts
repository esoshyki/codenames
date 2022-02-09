import { Actions, IAction } from "@/types/actions"
import { IUser } from "@/types/users";

// SAGAS //

export const socketConnected = (payload: string) : IAction => ({
    type: Actions.connection.socketConnected,
    payload
});

export const userLogged = (payload: string) => ({
    type: Actions.connection.userLogged,
    payload
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
})

