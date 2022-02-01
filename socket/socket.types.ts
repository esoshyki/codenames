import { User } from "@/types";
import { ChatMessage } from "@/store/chat/chat.types";
import { CollectionVote, GameStages, GuesserType, InGameUser, Round } from "@/store/game/game.types"
import { Sides } from '@/store/game/game.types';
import { Collection } from "@/utils/wordCollections";
import { SocketServerData } from "./socket.data";

interface SocketUser {
    userName: string;
    socketId: string;
};

export interface LoginResponse {
    user?: User,
    error?: string
};

export enum SocketServer {
    connected = "connected",
    CHANGE_ONLINE_USERS = "change-online-users",
    UPDATE_SERVER_DATA = "Socket/update-server-data",
    LOGIN_RESPONSE = "Socket/Login-Response",
    LOGOUT_RESPONSE = "Socket/Logout-Response",
    UPDATE_SERVER_DATA_RESPONSE = "Socket/Update-Server-Data-Response",
    ADD_MESSAGE_RESPONSE = "Socket/Add-Message-Response",
    START_GAME_RESPONSE = "Socket-Server/Start-Game-Response",
    UPDATE_GAME_MEMBERS = "Socket-Server/Update-Game-Members",
    UPDATE_COLLECTION_VOTES = "Socket-Server/Update-Collection-Votes",
    SET_COLLECTION = "Socket-Server/Set-Collection",
    UPDATE_FIELD_DATA = "Socket-Server/Update-Field-Data",
    UPDATE_GUESSER_DATA = "Socket-Server/Update-Guesser-Data",
    SET_GAME_STAGE = "Socket-Server/Set-Game-Stage",
    SET_TIMER = "Socket-Server/Set-Timer",
    SET_ROUND = "Socket-Server/Set-Round",
}

export enum SocketClient {
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
    TOOGLE_COLLECTION_VOTE_REQUEST = "Socket-Client/Toggle-Collection-Vote-Request",
};

export interface ServerToClient {
    connect: (sockedId: string) => void;
    [SocketServer.CHANGE_ONLINE_USERS]: (users: User[]) => void;
    [SocketServer.LOGIN_RESPONSE]: (user: User) => void;
    [SocketServer.LOGOUT_RESPONSE]: (user: User) => void;
    [SocketServer.UPDATE_SERVER_DATA_RESPONSE] : (serverData: SocketServerData) => void;
    [SocketServer.ADD_MESSAGE_RESPONSE]: (message: ChatMessage) => void;
    [SocketServer.START_GAME_RESPONSE] : (gameMembers: InGameUser[]) => void;
    [SocketServer.UPDATE_GAME_MEMBERS] : (gameMembers: InGameUser[]) => void;
    [SocketServer.UPDATE_COLLECTION_VOTES] : (votes: CollectionVote[]) => void;
    [SocketServer.SET_COLLECTION] : (collection: Collection) => void;
    [SocketServer.UPDATE_FIELD_DATA] : (words: string[]) => void;
    [SocketServer.UPDATE_GUESSER_DATA] : (guesserData: GuesserType) => void;
    [SocketServer.SET_GAME_STAGE] : (stage: GameStages) => void;
    [SocketServer.SET_TIMER] : (timer: number | null) => void;
    [SocketServer.SET_ROUND] : (round: Round) => void;
    
};

export interface ClientToServer {
    [SocketClient.LOGIN_REQUEST]: (user: SocketUser) => void;
    [SocketClient.LOGOUT_REQUEST]: (user: SocketUser) => void;
    [SocketClient.UPDATE_ONLINE_USERS_REQUEST]: () => void;
    [SocketClient.UPDATE_SERVER_DATA_REQUEST]: () => void;
    [SocketClient.ADD_MESSAGE_REQUEST]: (message: ChatMessage) => void;
    [SocketClient.START_GAME_REQUEST]: (user: User) => void;
    [SocketClient.SET_TEAM_REQUEST] : (user: User, side: Sides | null) => void;
    [SocketClient.SET_LEADER_REQUEST]: (user: User) => void;
    [SocketClient.TOGGLE_READY_REQUEST]: (userName: string) => void;
    [SocketClient.TOOGLE_COLLECTION_VOTE_REQUEST] : (userName: string, collectionIdx: number) => void;
};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    name: string;
    age: number;
    userName: string;
};
