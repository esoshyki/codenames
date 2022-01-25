import { User } from "@/types";

export enum UsersActions {
    LOGIN_REQUEST = "Users/Login-Request",
    LOGOUT_REQUEST = "Users/Logout-Request",
    SET_CURRENT_USER = "Users/Set-Current-Users",
    SET_LOGIN_ERROR = "Users/Set-Login-Error"
}

export interface UsersState {
    currentUser: User | null;
    loginError?: string;
}
