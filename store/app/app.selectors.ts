import { IState } from "@/types";

const stage = (state: IState) => state.app.stage;
const error = (state: IState) => state.app.error;
const systemInfo = (state: IState) => state.app.systemInfo;

export const appSelector = {
    stage,
    error,
    systemInfo
};

