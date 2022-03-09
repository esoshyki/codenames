import { IUser } from "@/types/users";
import { isDevelop } from "@/utils/isDevelop";

export enum ConnectionClient {
    SetSocketRequest = "SetSocketRequest",
    SetUserNameRequest = "SetUserNameRequest"
}

export interface ConnectionClientEmitters {
    [ConnectionClient.SetSocketRequest]: (user: IUser) => void;
    [ConnectionClient.SetUserNameRequest]: (user: IUser) => void;
};



export const connectionEmitters = (socket: any) => ({
    setSocketIdRequest: (user: IUser) => {
        isDevelop() && console.log("Socket-Client/setSocketIdRequest, data: ", user);
        socket.emit(ConnectionClient.SetSocketRequest, user);
    },
    
    setUserNameRequest: (user: IUser) => {
        isDevelop() && console.log("Socket-Client/setUserNameRequest, data: ", user);
        socket.emit(ConnectionClient.SetUserNameRequest, user)
    }
})


