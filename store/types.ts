export interface IAction {
    type: string,
    payload?: any
};

export interface IUser {
    userName: string,
    id: number
};

export interface IUserState {
    user: IUser | null,
    users: IUser[],
    loginError?: string;
}

export interface IState {
    user: IUserState
}