import { socket } from "..";
import { IUser } from "@/types/users";
import { isDevelop } from "@/utils/isDevelop";

export enum ConnectionClient {
    SetSocketRequest = "SetSocketRequest",
    SetUserNameRequest = "SetUserNameRequest"
}

export interface ConnectionClientEmitters {
    [ConnectionClient.SetSocketRequest]: (user: IUser) => void;
    [ConnectionClient.SetUserNameRequest]: (user: IUser) => void;
}

const setSocketIdRequest = (user: IUser) => {
    isDevelop() && console.log("Socket-Client/setSocketIdRequest, data: ", user);
    socket.emit(ConnectionClient.SetSocketRequest, user);
};

const setUserNameRequest = (user: IUser) => {
    isDevelop() && console.log("Socket-Client/setUserNameRequest, data: ", user);
    socket.emit(ConnectionClient.SetUserNameRequest, user)
};

export const connectionEmitters = {
    setSocketIdRequest,
    setUserNameRequest
};


