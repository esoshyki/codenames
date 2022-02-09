import { socket } from "..";
import { SClient } from "@/socket/socket.types";
import { IUser } from "@/types/users";

const setSocketIdRequest = (user: IUser) => {
    socket.emit(SClient.setSocketRequest, user);
};

const setUserNameRequest = (user: IUser) => {
    socket.emit(SClient.setUserNameRequest, user.userName)
};

export const connectionEmitters = {
    setSocketIdRequest,
    setUserNameRequest
};


