import { User } from "@/types";
import { ServerData } from '@/store/server/server.types';
import { ChatMessage } from "@/store/chat/chat.types";
import { InGameUser } from "@/store/game/game.types"
import { Sides } from '@/store/game/game.types';

interface SocketUser {
    userName: string;
    socketId: string;
};

export interface LoginResponse {
    user?: User,
    error?: string
};

export enum SocketServerActions {
    connected = "connected",
    CHANGE_ONLINE_USERS = "change-online-users",
    UPDATE_SERVER_DATA = "Socket/update-server-data",
    LOGIN_RESPONSE = "Socket/Login-Response",
    LOGOUT_RESPONSE = "Socket/Logout-Response",
    UPDATE_SERVER_DATA_RESPONSE = "Socket/Update-Server-Data-Response",
    ADD_MESSAGE_RESPONSE = "Socket/Add-Message-Response",
    START_GAME_RESPONSE = "Socket-Server/Start-Game-Response",
    UPDATE_GAME_MEMBERS = "Socket-Server/Update-Game-Members",
}

export enum SocketClientActions {
    UPDATE_ONLINE_USERS_REQUEST = "Socket/Update-Online-Users-Request",
    UPDATE_SERVER_DATA_REQUEST = "Socket/Update-Server-Data-Request",
    LOGIN_REQUEST = "Socket/Login-Request",
    LOGOUT_REQUEST = "Socket/Logout-Request",
    DISCONNECTING = "disconnecting",
    ADD_MESSAGE_REQUEST = "Socket/Add-Message-Request",
    START_GAME_REQUEST = "Socket/Start-Game-Request",
    SET_TEAM_REQUEST = "Socket-Client/Set-Team-Request",
    SET_LEADER_REQUEST = "Socket-Client/Set-Loader-Request",
    TOGGLE_READY_REQUEST = "Socket-Client/Toggle-Ready-Request",
};

export interface ServerToClientEvents {
    connect: (sockedId: string) => void;
    [SocketServerActions.CHANGE_ONLINE_USERS]: (users: User[]) => void;
    [SocketServerActions.LOGIN_RESPONSE]: (user: User) => void;
    [SocketServerActions.LOGOUT_RESPONSE]: (user: User) => void;
    [SocketServerActions.UPDATE_SERVER_DATA_RESPONSE] : (serverData: ServerData) => void;
    [SocketServerActions.ADD_MESSAGE_RESPONSE]: (message: ChatMessage) => void;
    [SocketServerActions.START_GAME_RESPONSE] : (gameMembers: InGameUser[]) => void;
    [SocketServerActions.UPDATE_GAME_MEMBERS] : (gameMembers: InGameUser[]) => void;

};

export interface ClientToServerEvents {
    [SocketClientActions.LOGIN_REQUEST]: (user: SocketUser) => void;
    [SocketClientActions.LOGOUT_REQUEST]: (user: SocketUser) => void;
    [SocketClientActions.UPDATE_ONLINE_USERS_REQUEST]: () => void;
    [SocketClientActions.UPDATE_SERVER_DATA_REQUEST]: () => void;
    [SocketClientActions.ADD_MESSAGE_REQUEST]: (message: ChatMessage) => void;
    [SocketClientActions.START_GAME_REQUEST]: (user: User) => void;
    [SocketClientActions.SET_TEAM_REQUEST] : (user: User, side: Sides | null) => void;
    [SocketClientActions.SET_LEADER_REQUEST]: (user: User) => void;
    [SocketClientActions.TOGGLE_READY_REQUEST]: (userName: string) => void;
};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    name: string;
    age: number;
    userName: string;
};
