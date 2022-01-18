import { IAction } from "../types";
import { store } from '../'

const CREATE_USER = "CREATE_USER";
const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";
const DELETE_USER = "DELETE_USER";

export const actions = {
    CREATE_USER,
    SET_LOGIN_ERROR,
    DELETE_USER
};

export const createUser = (userName: string, id: number): IAction => {

    return ({
        type: actions.CREATE_USER,
        payload: {
            userName,
            id
        }
    })
};

export const deleteUser = (id: number): IAction => {

    return ({
        type: actions.DELETE_USER,
        payload: id
    });
};

export const createLoginError = (error: string): IAction => ({
    type: SET_LOGIN_ERROR,
    payload: error
});

export const clearLoginError = (): IAction => ({
    type: SET_LOGIN_ERROR,
})