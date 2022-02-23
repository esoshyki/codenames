import { IState } from "@/types";

const stage = (state: IState) => state.app.stage;
const error = (state: IState) => state.app.error;
const systemInfo = (state: IState) => state.app.systemInfo;
const locale = (state: IState) => state.app.locale;
const layoutEffect = (state: IState) => state.app.layoutEffect;

export const appSelector = {
    stage,
    error,
    systemInfo,
    locale,
    layoutEffect
};

