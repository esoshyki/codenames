import { IUser } from "@/types/users";
import { ServerData } from "@/socket/server/data";
import { ConnectionClient } from '../../client/emitters/connection';


export const addConnectionListeners = 
    (
        socket: any,
        serverData: ServerData
    ) => {

        socket.on(ConnectionClient.SetSocketRequest, (user: IUser) => {
            serverData.connection.setSocketId(user);
        });

        socket.on("disconnecting", () => {
            serverData.connection.disconnectUser(socket.id);
        });

        socket.on(ConnectionClient.SetUserNameRequest, (user: IUser) => {
            serverData.connection.setUserName(user);
        })

} 