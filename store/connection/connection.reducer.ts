import { IConnectionState } from "@/types/connection";
import { Actions, IAction } from "@/types/actions";

const initialState: IConnectionState = {
    onlineUsers: [],
    currentUser: {
        
    }
};

export const connectionReducer = 
    (state = initialState, action: IAction) : IConnectionState => {

    const { type, payload } = action;

    switch (type) {

        case Actions.connection.setUserName:

            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    userName: payload
                }
            }

        case Actions.connection.setSocketId:

        return {
            ...state,
            currentUser: {
                ...state.currentUser,
                socketId: payload
            }
        }      

        default: 
            return {
                ...state
            }
    }
}