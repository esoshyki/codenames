import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../../socket.types";
import { databaseService } from "@/firebase/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function socketIO(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!req) return;

  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(httpServer, {
      path: "/api/socketio",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

	io.sockets.on("connection", (socket) => {

    const socketId = socket.id;
		
    socket.on("disconnecting", () => {
      databaseService.removeOnlineUserBySocketId(socketId).then(() => {
        io.emit("userDisconnected")
      });
		});

	});

    res.socket.server.io = io;
  }
  res.end();
}
