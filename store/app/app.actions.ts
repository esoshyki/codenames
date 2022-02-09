import { ReduxAction } from "@/types";
import { Actions } from "@/types/actions";
import { AppStages } from "@/types/app";

const actions = Actions.app;

export const setAppStage = (payload: AppStages) : ReduxAction => ({
    type: actions.setAppStage,
    payload
});

export const setAppError = (payload?: string) : ReduxAction => ({
    type: actions.setAppError,
    payload
});
