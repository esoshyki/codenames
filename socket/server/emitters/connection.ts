import { IO } from "../../socket.types";
import { IUser } from "@/types/users";

export enum ConnectionServer {
    UpdateOnlineUsers = "UpdateOnlineUsers"
};

export interface ConnectionServerEmitters {
    [ConnectionServer.UpdateOnlineUsers]: (onlineUsers: IUser[]) => void;
}

export class ConnectionServerEmitter {
    io: IO;
    constructor(io: IO) {
        this.io = io;
    }

    updateOnlineUsers = (onlineUsers: IUser[]) => {
        this.io.emit(ConnectionServer.UpdateOnlineUsers, onlineUsers)
    }
}
