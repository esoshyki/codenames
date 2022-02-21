import { SClient, SServer } from "../../socket.types";
import { Server as ServerIO } from "socket.io";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../../socket.types";
import { ServerData } from "@/socket/data";

export const addAppEmitters = 
    (
        socket: any, io: ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>,
        serverData: ServerData
    ) => {

        socket.on(SClient.ResetServerData, () => {
            serverData.reset();
            io.emit(SServer.ResetServerResponse);
        })

} 