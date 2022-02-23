import { Dispatch } from "react";
import { AnyAction } from "redux";
import { io } from "socket.io-client";
import { socketConnected, socketDisconnected, updateOnlineUsers } from "@/store/connection/connection.actions";
import { connectionEmitters } from "./emitters/connection";
import { IUser } from "@/types/users";
import { gameEmitters } from "./emitters/game";
import { appEmitters } from "./emitters/app";
import { setAppListeners } from "./listeners/app";
import { setGameListeners } from "./listeners/game";
import { ConnectionServer } from "../server/emitters/connection";


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

    socket.on(ConnectionServer.UpdateOnlineUsers, (users: IUser[]) => {
        dispatch(updateOnlineUsers(users))
    })

    setAppListeners(dispatch);
    setGameListeners(dispatch);

    
};

const clientSocket = {
    connection: connectionEmitters,
    game: gameEmitters,
    app: appEmitters
}

export default clientSocket;
