export interface IAction {
    type: string;
    payload?: any;
};

export interface IUser {
    userName: string;
    id: number;
};

export interface IUserState {
    user: IUser | null;
    users: IUser[];
    loginError?: string;
};

export interface IChatMessage {
    message: string;
    user: IUser;
    id: number;
};

export interface IChatState {
    messages: IChatMessage[];
    hidden: boolean;
    users: IUser[];
    connected: boolean;
};

export interface IState {
    user: IUserState;
    chat: IChatState;
};