import { SClient, SServer } from "../../socket.types";
import { Server as ServerIO } from "socket.io";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../../socket.types";
import { IUser } from "@/types/users";
import { ServerData } from "@/socket/data";


export const addConnectionsEmiters = 
    (
        socket: any, io: ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>,
        serverData: ServerData
    ) => {

        socket.on(SClient.setSocketRequest, (user: IUser) => {
            serverData.connection.setSocketId(user);
            io.emit(SServer.updateOnlineUsers, serverData.connection.getAllUsers());
        });

        socket.on("disconnecting", () => {
            serverData.connection.disconnectUser(socket.id);
            io.emit(SServer.updateOnlineUsers, serverData.connection.getAllUsers());
        });

        socket.on(SClient.setUserNameRequest, (user: IUser) => {
            serverData.connection.setUserName(user);
            io.emit(SServer.updateOnlineUsers, serverData.connection.getAllUsers());
        })

} 