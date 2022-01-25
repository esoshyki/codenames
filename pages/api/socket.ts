import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import {
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
} from "../../types/socket.types";
import { SocketActions } from "@/types/socket.actions";

export const config = {
    api: {
        bodyParser: false
    }
};

interface SocketUser {
    userName: string;
    socketId: string;
}

interface ServerData {
    onlineUsers: SocketUser[];
}

const serverData: ServerData = {
    onlineUsers: []
};

const getOnlineUsers = () =>
    serverData.onlineUsers.map((user) => ({ userName: user.userName }));

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
            path: "/api/socket",
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        io.sockets.on("connection", (serverSocket) => {
            serverSocket.on(SocketActions.DISCONNECTING, () => {
                const socketId = serverSocket.id;
                const newOnlineUsers = serverData.onlineUsers.filter(
                    (user) => user.socketId !== socketId
                );
                serverData.onlineUsers = newOnlineUsers;
                serverSocket.emit(
                    SocketActions.CHANGE_ONLINE_USERS,
                    getOnlineUsers()
                );
            });

			serverSocket.on(SocketActions.UPDATE_ONLINE_USERS_REQUEST, () => {
				serverSocket.emit(SocketActions.CHANGE_ONLINE_USERS, getOnlineUsers());
			});

            serverSocket.on(SocketActions.LOGIN, (userdata) => {
                serverData.onlineUsers.push(userdata);
                serverSocket.emit(
                    SocketActions.CHANGE_ONLINE_USERS,
                    getOnlineUsers()
                );
            });

            serverSocket.on(SocketActions.LOGOUT, (user) => {
                const newOnlineUsers = serverData.onlineUsers.filter(
                    (el) => el.userName !== user.userName
                );
                serverData.onlineUsers = newOnlineUsers;
                serverSocket.emit(
                    SocketActions.CHANGE_ONLINE_USERS,
                    getOnlineUsers()
                );
            });
        });

        res.socket.server.io = io;
    }

    res.end();
}
