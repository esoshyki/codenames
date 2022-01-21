import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "../../socket.types";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
      path: "/api/socketio",
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    res.socket.server.io = io;
  }
  res.end();
};