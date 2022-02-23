import { IField, IMystery, IRound } from "@/types/game";
import { IUser } from "@/types/users";
import { GameClientEmitters } from "./client/emitters/game";
import { Server as ServerIO } from "socket.io";
import { ConnectionClientEmitters } from "./client/emitters/connection";

export enum SServer {
    connected = "connected",
    updateOnlineUsers = "updateOnlineUsers",
    UpdateGameMembers = "updateGameMembers",
    ResetServerResponse = "ResetServerResponse",
    allReady = "AllReady",
    SetField = "SetField",
    SetRound = "SetRound",
    MakeMysteryResponse = "MakeMysteryResponse",
    MakeVoteResponse = "MakeVoteResponse",
    AllVotesDoneResponse = "AllVotesDoneResponse"
}

export interface ServerToClient {
    [SServer.updateOnlineUsers]: (users: IUser[]) => void;
    [SServer.UpdateGameMembers]: (gameMembers: IUser[]) => void;
    [SServer.ResetServerResponse]: () => void;
    [SServer.allReady]: () => void;
    [SServer.SetField] : (field: IField) => void;
    [SServer.SetRound] : (round: IRound) => void;
    [SServer.MakeMysteryResponse] : (mystery?: IMystery) => void;
    [SServer.MakeVoteResponse] : (votes: number[]) => void;
    [SServer.AllVotesDoneResponse] : (winnerVote: number) => void;
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

