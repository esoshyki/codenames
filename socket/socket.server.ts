import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData} from "./socket.types";
import { NextApiResponseServerIO } from "@/types/next";
import { SocketClientActions, SocketServerActions } from "./socket.types";
import { ChatMessage } from "@/store/chat/chat.types";
import { User } from '@/types';
import ServerData from "./socket.data";
import { Sides } from "@/store/game/game.types";


const serverData = new ServerData();

export const creatseServerSocket = (res: NextApiResponseServerIO) => {
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
            serverData.disconnectUser(socket.id);
            io.emit(SocketServerActions.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
        });

        socket.on(SocketClientActions.UPDATE_ONLINE_USERS_REQUEST, () => {
            io.emit(SocketServerActions.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
        });

        socket.on(SocketClientActions.UPDATE_SERVER_DATA_REQUEST, () => {
            io.emit(SocketServerActions.UPDATE_SERVER_DATA_RESPONSE, serverData.getServerData())
        });

        socket.on(SocketClientActions.LOGIN_REQUEST, (user) => {
            serverData.loginUser(user);
            io.emit(SocketServerActions.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
            io.emit(SocketServerActions.LOGIN_RESPONSE, user)
        });

        socket.on(SocketClientActions.LOGOUT_REQUEST, (user) => {
            serverData.disconnectUser(user.socketId);
            io.emit(SocketServerActions.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
        });

        socket.on(SocketClientActions.ADD_MESSAGE_REQUEST, (message: ChatMessage) => {
            serverData.addMessage(message);
            io.emit(SocketServerActions.ADD_MESSAGE_RESPONSE, message);
        });

        socket.on(SocketClientActions.START_GAME_REQUEST, (user: User) => {
            serverData.startGame(user);
            io.emit(SocketServerActions.START_GAME_RESPONSE, serverData.getGameMembers())
        });

        socket.on(SocketClientActions.SET_TEAM_REQUEST, (user: User, side: Sides | null) => {
            serverData.setTeam(user, side);
            io.emit(SocketServerActions.UPDATE_GAME_MEMBERS, serverData.getGameMembers())
        });

        socket.on(SocketClientActions.SET_LEADER_REQUEST, (user: User) => {
            serverData.toggleLeader(user);
            io.emit(SocketServerActions.UPDATE_GAME_MEMBERS, serverData.getGameMembers())
        });

        socket.on(SocketClientActions.TOGGLE_READY_REQUEST, (userName: string) => {
            serverData.toggleReady(userName);
            io.emit(SocketServerActions.UPDATE_GAME_MEMBERS, serverData.getGameMembers())
        })
    });

    return io;
}