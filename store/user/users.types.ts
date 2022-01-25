import { User } from '@/types'

export enum UserActions {
    SET_SOCKET_ID = "User/Set-Socket-Id",
    SET_LOGIN_ERROR = "User/Set-Login-Error",
    SET_PROCESSING = "User/Set-Processing",
    SET_USERNAME = "User/Set-Username"
};

export interface UserState {
    user: User | null,
    loginError: string | null,
    usersOnline: User[],
    processing: boolean,
}
