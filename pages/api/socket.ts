import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData} from "../../types/socket.types";
import { SocketClientActions, SocketServerActions} from "@/types/socket.actions";
import { User } from "@/types";
import { ServerData } from "@/store/server/server.types";

export const config = {
    api: {
        bodyParser: false
    }
};

interface SocketUser {
    userName: string;
    socketId: string;
}

interface ChatMessage {
    message: string;
    author: User;
}

interface SocketServerData {
    onlineUsers: SocketUser[];
    chatMessages: ChatMessage[];
}

const serverData: SocketServerData = {
    onlineUsers: [],
    chatMessages: []
};

const getOnlineUsers = () => serverData.onlineUsers.map((user) => ({ userName: user.userName }));

const getServerData = () : ServerData => {

    return ({
        onlineUsers: getOnlineUsers(),
    })
};

const userExists = (user: SocketUser) => Boolean(serverData.onlineUsers.find((el) => el.userName === user.userName));

export default async function socketIO(
    req: NextApiRequest,
    res: NextApiResponseServerIO
) {
    if (!req) return;

    if (!res.socket.server.io) {
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
            httpServer, {
                path: "/api/socket",
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"]
            }
        });

        io.sockets.on("connection", (socket) => {
            socket.on(SocketClientActions.DISCONNECTING, () => {
                const socketId = socket.id;
                const newOnlineUsers = serverData.onlineUsers.filter(
                    (user) => user.socketId !== socketId
                );
                serverData.onlineUsers = newOnlineUsers;
                io.emit(
                    SocketServerActions.CHANGE_ONLINE_USERS,
                    getOnlineUsers()
                );
            });

            socket.on(SocketClientActions.UPDATE_ONLINE_USERS_REQUEST, () => {
                io.emit(
                    SocketServerActions.CHANGE_ONLINE_USERS,
                    getOnlineUsers()
                );
            });

            socket.on(SocketClientActions.UPDATE_SERVER_DATA_REQUEST, () => {
                io.emit(
                    SocketServerActions.UPDATE_SERVER_DATA_RESPONSE,
                    getServerData()
                )
            });

            socket.on(SocketClientActions.LOGIN_REQUEST, (userdata) => {

                if (!userExists(userdata)) {
                    serverData.onlineUsers.push(userdata);
                }

                io.emit(
                    SocketServerActions.CHANGE_ONLINE_USERS,
                    getOnlineUsers()
                );
            });

            socket.on(SocketClientActions.LOGOUT_REQUEST, (user) => {
                const newOnlineUsers = serverData.onlineUsers.filter(
                    (el) => el.userName !== user.userName
                );
                serverData.onlineUsers = newOnlineUsers;
                io.emit(
                    SocketServerActions.CHANGE_ONLINE_USERS,
                    getOnlineUsers()
                );
            });
        });

        res.socket.server.io = io;
    }

    res.end();
}
