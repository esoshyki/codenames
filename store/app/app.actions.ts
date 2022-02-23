import { ReduxAction } from "@/types";
import { Actions } from "@/types/actions";
import { AppStages, LayoutEffects } from "@/types/app";
import { Locales } from "translate/locales";

const actions = Actions.app;

export const setAppStage = (payload: AppStages) : ReduxAction => ({
    type: actions.setAppStage,
    payload
});

export const setAppError = (payload?: string) : ReduxAction => ({
    type: actions.setAppError,
    payload
});

export const changeAppStageRequest = (payload: AppStages) : ReduxAction => ({
    type: actions.ChangeAppStageRequest,
    payload
});

export const appRestartRequest = () : ReduxAction => ({
    type: actions.RestartRequest
});

export const appRestart = () : ReduxAction => ({
    type: actions.Restart
});

export const appReset = () : ReduxAction => ({
    type: actions.Reset
})

export const setLocale = (payload: Locales) => ({
    type: actions.SetLocale,
    payload
})

export const setLayoutEffect = (payload?: LayoutEffects) => ({
    type: actions.SetLayoutEffect,
    payload
})
