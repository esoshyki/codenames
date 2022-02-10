import { IConnectionState } from "@/types/connection";
import { Actions, IAction } from "@/types/actions";
import { IUser } from "@/types/users";

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

        case Actions.connection.updateOnlineUsers:
            return {
                ...state,
                onlineUsers: payload
            };

        case Actions.connection.setError:
            return {
                ...state,
                connectionError: payload
            }

        default: 
            return {
                ...state
            }
    }
}