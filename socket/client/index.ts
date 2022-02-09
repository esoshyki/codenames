import { IUser } from "@/types/users";
import { SClient } from "../socket.types";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { io } from "socket.io-client";
import { setSocketId } from "@/store/app/app.actions";


export const socket = io(
    process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    {
        path: "/api/socket"
    }
);

export const connectSocket = (dispatch: Dispatch<AnyAction>) => {
    socket.on("connect", () => {
        dispatch(setSocketId(socket.id));
    });

};

const setSocketIdRequest = (user: IUser) => {
    socket.emit(SClient.setSocketRequest, user);
};

const setUserNameRequest = (user: IUser) => {
    socket.emit(SClient.setUserNameRequest, user.userName)
};

const clientSocket = {
    setSocketIdRequest,
    setUserNameRequest
};

export default clientSocket;
