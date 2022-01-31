import { User } from "@/types";
import { ChatMessage } from "@/store/chat/chat.types";
import { CollectionVote, GameStages, GuesserType, InGameUser } from "@/store/game/game.types"
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
    UPDATE_COLLECTION_VOTES = "Socket-Server/Update-Collection-Votes",
    SET_COLLECTION = "Socket-Server/Set-Collection",
    UPDATE_FIELD_DATA = "Socket-Server/Update-Field-Data",
    UPDATE_GUESSER_DATA = "Socket-Server/Update-Guesser-Data",
    SET_GAME_STAGE = "Socket-Server/Set-Game-Stage",
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
    TOOGLE_COLLECTION_VOTE_REQUEST = "Socket-Client/Toggle-Collection-Vote-Request",
};

export interface ServerToClientEvents {
    connect: (sockedId: string) => void;
    [SocketServerActions.CHANGE_ONLINE_USERS]: (users: User[]) => void;
    [SocketServerActions.LOGIN_RESPONSE]: (user: User) => void;
    [SocketServerActions.LOGOUT_RESPONSE]: (user: User) => void;
    [SocketServerActions.UPDATE_SERVER_DATA_RESPONSE] : (serverData: SocketServerData) => void;
    [SocketServerActions.ADD_MESSAGE_RESPONSE]: (message: ChatMessage) => void;
    [SocketServerActions.START_GAME_RESPONSE] : (gameMembers: InGameUser[]) => void;
    [SocketServerActions.UPDATE_GAME_MEMBERS] : (gameMembers: InGameUser[]) => void;
    [SocketServerActions.UPDATE_COLLECTION_VOTES] : (votes: CollectionVote[]) => void;
    [SocketServerActions.SET_COLLECTION] : (collection: Collection) => void;
    [SocketServerActions.UPDATE_FIELD_DATA] : (words: string[]) => void;
    [SocketServerActions.UPDATE_GUESSER_DATA] : (guesserData: GuesserType) => void;
    [SocketServerActions.SET_GAME_STAGE] : (stage: GameStages) => void;
    
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
    [SocketClientActions.TOOGLE_COLLECTION_VOTE_REQUEST] : (userName: string, collectionIdx: number) => void;
};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    name: string;
    age: number;
    userName: string;
};
