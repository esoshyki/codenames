import { IState } from "@/types";

const usersOnline = (state: IState) => state.app.usersOnline;
const stage = (state: IState) => state.app.stage;
const currentUser = (state: IState) => state.app.currentUser;
const error = (state: IState) => state.app.error;
const systemInfo = (state: IState) => state.app.systemInfo;

export const appSelector = {
    usersOnline,
    stage,
    currentUser,
    error,
    systemInfo
};

