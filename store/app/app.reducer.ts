import { AppStages, IApp } from "@/types/app";
import { actions, IAction } from "@/types/actions";

const initialState: IApp = {
    stage: AppStages.nogame,
    usersOnline: [],
    systemInfo: {
        version: "1.1",
        connectionStatus: "disconnected",
    },
    currentUser: {
        
    }
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
                currentUser: {
                    userName: state.currentUser?.userName,
                    socketId: payload
                },
                systemInfo: {
                    ...state.systemInfo,
                    connectionStatus: payload ? "connected" : "disconnected"
                }
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
