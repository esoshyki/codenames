import { IState } from "@/types";

const currentUser = (state: IState) => state.connection.currentUser;
const connectionError = (state: IState) => state.connection.connectionError;
const onlineUsers = (state: IState) => state.connection.onlineUsers;
const loggedUsers = (state: IState) => state.connection.onlineUsers.filter(user => user.userName);

export const connectionSelector = {
    currentUser,
    connectionError,
    onlineUsers,
    loggedUsers
};

