import { IState } from "@/types";

export const getOnlineUsers = (state: IState) => state.app.usersOnline;
export const getAppStage = (state: IState) => state.app.stage;
export const getCurrentUser = (state: IState) => state.app.currentUser;
export const getAppError = (state: IState) => state.app.error;
