import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData} from "./socket.types";
import { NextApiResponseServerIO } from "@/types/next";
import { SocketClientActions, SocketServerActions } from "./socket.types";
import { ChatMessage } from "@/store/chat/chat.types";
import { ServerData } from '@/store/server/server.types';
import { User } from '@/types';
import { GameData } from "@/store/game/game.types";
import { InGameUser } from "@/store/game/game.types";
import { createGameMember } from './lib';

interface SocketUser {
    userName: string;
    socketId: string;
}


interface SocketServerData {
    onlineUsers: SocketUser[];
    chatMessages: ChatMessage[];
    gameData: GameData;
    gameMembers: InGameUser[]
}

const serverData: SocketServerData = {
    onlineUsers: [],
    chatMessages: [],
    gameMembers: [],
    gameData: {
        guesserData: null,
        startSide: null,
        leaders: {
            blue: null,
            red: null,
        },
        fieldData: null,
        collection: null,
    
        round: {
            number: 1,
            side: null,
            votes: []
        }
    }
};

const getOnlineUsers = () => serverData.onlineUsers.map((user) => ({ userName: user.userName }));

const getServerData = () : ServerData => {

    return ({
        onlineUsers: getOnlineUsers(),
    })
};

const userExists = (user: SocketUser) => Boolean(serverData.onlineUsers.find((el) => el.userName === user.userName));

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

            io.emit(SocketServerActions.LOGIN_RESPONSE, userdata)
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

        socket.on(SocketClientActions.ADD_MESSAGE_REQUEST, (message: ChatMessage) => {
            serverData.chatMessages.push(message);

            io.emit(SocketServerActions.ADD_MESSAGE_RESPONSE, (message))
        });

        socket.on(SocketClientActions.START_GAME_REQUEST, (user: User) => {
            if (serverData.gameMembers.every(us => us.userName !== user.userName)) {
                serverData.gameMembers.push(createGameMember(user));
                io.emit(SocketServerActions.START_GAME_RESPONSE, serverData.gameMembers)
            };
        })
    });

    return io;
}