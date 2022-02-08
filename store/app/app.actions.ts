import { ReduxAction } from "@/types";
import { actions } from "@/types/actions";
import { AppStages, IError } from "@/types/app";
import { IUser } from "../types";

export const updateOnlineUsersRequest = () : ReduxAction => ({
    type: actions.updateOnlineUsersRequest
});

export const setOnlineUsers = (payload: IUser[]) : ReduxAction => ({
    type: actions.setOnlineUsers,
    payload
});

export const changeAppStageQuery = (payload: AppStages) : ReduxAction => ({
    type: actions.changeAppStageQuery,
    payload
});

export const setAppStage = (payload: AppStages) : ReduxAction => ({
    type: actions.setAppStage,
    payload
});

export const setSocketId = (payload: string) : ReduxAction => ({
    type: actions.setSocketId,
    payload
});

export const setCurrentUserRequest = (payload: IUser) : ReduxAction => ({
    type: actions.setCurrentUserRequest,
    payload
});

export const setAppError = (payload?: string) : ReduxAction => ({
    type: actions.setAppError,
    payload
});

export const setCurrentUser = (payload: IUser) => ({
    type: actions.setCurrentUser,
    payload
});