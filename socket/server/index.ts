import { NextApiResponseServerIO } from "@/types/next"
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../socket.types";
import { addConnectionsEmiters } from "./emitters/connection";
import { ServerData } from "../data";
import { addGameEmitters } from "./emitters/game";
import { addAppEmitters } from "./emitters/app";

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

    const serverData = new ServerData();


    
    io.sockets.on("connection", (socket) => {
        addConnectionsEmiters(socket, io, serverData);
        addGameEmitters(socket, io, serverData);
        addAppEmitters(socket, io, serverData);
    })

    return io
};