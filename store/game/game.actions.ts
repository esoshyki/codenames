import { IAction, IUser } from "../types";
import { Dispatch, AnyAction } from 'redux';

const ADD_READY_USER = "ADD_READY_USER";
const REMOVE_READY_USER = "REMOVE_READY_USER";
const SET_READY = "SET_READY";
const SET_PROCESSING = "SET_PROCESSING";

export const actions = {
    ADD_READY_USER,
    REMOVE_READY_USER,
    SET_READY,
    SET_PROCESSING
};

export const setReady = (value: boolean) : IAction => ({
    type: actions.SET_READY,
    payload: value
});

export const addReadyUser = (user: IUser) : IAction => ({
    type: actions.ADD_READY_USER,
    payload: user
});

export const removeReadyUser = (user: IUser) : IAction => ({
    type: actions.REMOVE_READY_USER,
    payload: user
});

export const setProcessing = (value: boolean) : IAction => ({
    type: actions.SET_PROCESSING,
    payload: value
});

