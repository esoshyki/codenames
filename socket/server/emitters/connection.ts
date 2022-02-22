import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../../socket.types";
import { Server as ServerIO } from "socket.io";
import { IUser } from "@/types/users";
import { SServer } from "../../socket.types";

export const createConnectionEmitters = (
    io: ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>
) => {

    return ({
        updateOnlineUsers: (onlineUser: IUser[]) => {
            io.emit(SServer.updateOnlineUsers, onlineUser)
        },
    })
}