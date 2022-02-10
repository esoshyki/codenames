import { Dispatch } from "react";
import { AnyAction } from "redux";
import { io } from "socket.io-client";
import { socketConnected, socketDisconnected, updateOnlineUsers } from "@/store/connection/connection.actions";
import { connectionEmitters } from "./emitters/connection";
import { SServer } from "../socket.types";
import { IUser } from "@/types/users";


export const socket = io(
    process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    {
        path: "/api/socket"
    }
);

export const connectSocket = (dispatch: Dispatch<AnyAction>) => {
    socket.on("connect", () => {
        dispatch(socketConnected(socket.id));
    });

    socket.on("disconnect", () => {
        dispatch(socketDisconnected())
    })

    socket.on(SServer.updateOnlineUsers, (users: IUser[]) => {
        console.log("users", users);
        dispatch(updateOnlineUsers(users))
    })
};

const clientSocket = {
    connection: connectionEmitters
}

export default clientSocket;
