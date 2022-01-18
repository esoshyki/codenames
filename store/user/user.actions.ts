import { IAction } from "../types";

const CREATE_USER = "CREATE_USER";

export const actions = {
    CREATE_USER
};

export const createUser = (userName: string, id: number) : IAction => ({
    type: actions.CREATE_USER,
    payload: {
        userName,
        id
    }
});