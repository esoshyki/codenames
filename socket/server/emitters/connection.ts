import { Server } from "../../data"
import { SClient, SServer } from "../../socket.types";
import { Server as ServerIO } from "socket.io";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../../socket.types";
import { IUser } from "@/types/users";

const server = new Server();

export const addConnectionsEmiters = 
    (
        socket: any, io: ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>

    ) => {

        socket.on(SClient.setSocketRequest, (user: IUser) => {
            server.connection.setSocketId(user);
            io.emit(SServer.updateOnlineUsers, server.connection.getAllUsers());
        });

        socket.on("disconnecting", () => {
            server.connection.disconnectUser(socket.id);
            io.emit(SServer.updateOnlineUsers, server.connection.getAllUsers());
        });

        socket.on(SClient.setUserNameRequest, (user: IUser) => {
            server.connection.setUserName(user);
            io.emit(SServer.updateOnlineUsers, server.connection.getAllUsers());
        })

} 