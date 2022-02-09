import { Dispatch } from "react";
import { AnyAction } from "redux";
import { io } from "socket.io-client";
import { setSocketId } from "@/store/app/app.actions";
import { connectionEmitters } from "./emitters/connection";


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

const clientSocket = {
    connection: connectionEmitters
}

export default clientSocket;
