import { NextApiResponseServerIO } from "@/types/next"
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../socket.types";
import { addConnectionListeners } from "./listeners/connection";
import { ServerData } from "./data";
import { addGameListeners } from "./listeners/game";
import { addAppEmitters } from "./listeners/app";

export const createIo = (res: NextApiResponseServerIO) => {
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>(
        httpServer, {
            path: "/api/socket",
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
        }   
    });

    const serverData = new ServerData(io);
    
    io.sockets.on("connection", (socket) => {
        addConnectionListeners(socket, serverData);
        addGameListeners(socket, serverData);
        addAppEmitters(socket, io, serverData);
    })

    return io
};