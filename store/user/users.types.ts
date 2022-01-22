import { IUser } from "../types";

export enum UsersTypes {
    CONNECT = "Users/Connect",
    DISCONNECT_REQUEST = "Users/Disconnect-Request",
    USER_LOGIN_REQUEST = "Users/User-Login-Request",
    USER_LOGOUT_REQUEST = "Users/User-Logout-Request",
    SET_ONLINE_USERS = "Users/Set-online-users",
    SET_CURRENT_USER = "Users/Set-current-user"
};

export interface IUserState {
    user: IUser | null,
    usersOnline: IUser[]
}
