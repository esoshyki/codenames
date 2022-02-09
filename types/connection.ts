import { IUser } from "./users";

export type OnlineUsers = IUser[];

export type IConnectionState = {
    onlineUsers: OnlineUsers,
    currentUser: IUser;
    connectionError?: string
};