import { GameClientEmitters } from "./client/emitters/game";
import { Server as ServerIO } from "socket.io";
import { ConnectionClientEmitters } from "./client/emitters/connection";
import { GameServerEmitters } from "./server/emitters/game";
import { ConnectionServerEmitters } from "./server/emitters/connection";
import { AppServerEmitters } from "./server/emitters/app";

export enum SServer {
    ResetServerResponse = "ResetServerResponse",
}

export interface ServerToClient 
    extends GameServerEmitters, ConnectionServerEmitters, AppServerEmitters {
};

export interface ClientToServer 
    extends GameClientEmitters, ConnectionClientEmitters {
};

export interface InterServerEvents {
    ping: () => void;
};

export interface SocketData {
    name: string;
    age: number;
    userName: string;
};

export type IO = ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>

