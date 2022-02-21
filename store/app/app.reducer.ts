import { AppStages, IApp } from "@/types/app";
import { Actions, IAction } from "@/types/actions";
import { Locales } from "translate/locales";

const initialState: IApp = {
    stage: AppStages.nogame,
    systemInfo: {
        version: "1.1",
        connectionStatus: "disconnected",
    },
    locale: Locales.be
};

const actions = Actions.app;

export const appReducer = (state = initialState, action : IAction): IApp => {

    const { type, payload } = action;

    switch (type) {

       case actions.setAppStage:
            return ({
                ...state,
                stage: payload
            })

        case actions.setAppError:
            return ({
                ...state,
                error: payload
            })

        case actions.SetLocale:
            return {
                ...state,
                locale: payload
            }
 
        default:
            return state;
    }
};
