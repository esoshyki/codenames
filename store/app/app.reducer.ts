import { IAction } from "../types";
import { AppStages, IApp } from "@/types/app";
import { actions } from "@/types/actions";

const initialState: IApp = {
    stage: AppStages.nogame,
    usersOnline: [],
    socketId: "",
};

export const appReducer = (state = initialState, { type, payload }: IAction): IApp => {

    switch (type) {

        case actions.setOnlineUsers:
            return ({
                ...state,
                usersOnline: payload
            })

        case actions.setAppStage:
            return ({
                ...state,
                stage: payload
            })

        case actions.setSocketId:
            return ({
                ...state,
                socketId: payload
            })

        case actions.setCurrentUser:
            return ({
                ...state,
                currentUser: payload
            });

        case actions.setAppError:
            return ({
                ...state,
                error: payload
            })
 
        default:
            return state;
    }
};
