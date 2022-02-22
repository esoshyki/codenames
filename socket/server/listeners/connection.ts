import { SClient, SServer } from "../../socket.types";
import { Server as ServerIO } from "socket.io";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../../socket.types";
import { IUser } from "@/types/users";
import { ServerData } from "@/socket/data";
import { createConnectionEmitters } from "../emitters/connection";


export const addConnectionsEmiters = 
    (
        socket: any, io: ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>,
        serverData: ServerData
    ) => {

        const emitter = createConnectionEmitters(io);

        socket.on(SClient.setSocketRequest, (user: IUser) => {
            serverData.connection.setSocketId(user);
            emitter.updateOnlineUsers(serverData.connection.getAllUsers())
        });

        socket.on("disconnecting", () => {
            serverData.connection.disconnectUser(socket.id);
            emitter.updateOnlineUsers(serverData.connection.getAllUsers())
        });

        socket.on(SClient.setUserNameRequest, (user: IUser) => {
            serverData.connection.setUserName(user);
            emitter.updateOnlineUsers(serverData.connection.getAllUsers())
        })

} 