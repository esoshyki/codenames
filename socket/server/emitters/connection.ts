import { Server } from "../../data"
import { SClient } from "../../socket.types";
import { Server as ServerIO } from "socket.io";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../../socket.types";

export const addConnectionsEmiters = 
    (
        socket: any, server: Server, 
        io: ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>

    ) => {

} 