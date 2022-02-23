import { IO } from "../../socket.types";
import { IUser } from "@/types/users";
import { ServerData } from "@/socket/server/data";
import { createConnectionEmitters } from "../emitters/connection";
import { ConnectionClient } from '../../client/emitters/connection';


export const addConnectionsEmiters = 
    (
        socket: any, io: IO,
        serverData: ServerData
    ) => {

        const emitter = createConnectionEmitters(io);

        socket.on(ConnectionClient.SetSocketRequest, (user: IUser) => {
            serverData.connection.setSocketId(user);
            emitter.updateOnlineUsers(serverData.connection.getAllUsers())
        });

        socket.on("disconnecting", () => {
            serverData.connection.disconnectUser(socket.id);
            emitter.updateOnlineUsers(serverData.connection.getAllUsers())
        });

        socket.on(ConnectionClient.SetUserNameRequest, (user: IUser) => {
            serverData.connection.setUserName(user);
            emitter.updateOnlineUsers(serverData.connection.getAllUsers())
        })

} 