import { socket } from "..";
import { SClient } from "@/socket/socket.types";
import { IUser } from "@/types/users";
import { isDevelop } from "@/utils/isDevelop";

const setSocketIdRequest = (user: IUser) => {
    isDevelop() && console.log("Socket-Client/setSocketIdRequest, data: ", user);
    socket.emit(SClient.setSocketRequest, user);
};

const setUserNameRequest = (user: IUser) => {
    isDevelop() && console.log("Socket-Client/setUserNameRequest, data: ", user);
    socket.emit(SClient.setUserNameRequest, user)
};

export const connectionEmitters = {
    setSocketIdRequest,
    setUserNameRequest
};


