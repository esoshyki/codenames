import { IO } from "../../socket.types";
import { IUser } from "@/types/users";
import { IField, IMystery, IRound } from "@/types/game";
import { isGameFinished } from "@/socket/socket.utils";

export enum GameServer {
    UpdateGameMembers = "UpdateGameMembers",
    SetField = "SetField",
    SetRound = "SetRound",
    AllReady = "AllReady",
    MakeMysteryResponse = "MakeMysteryResponse",
    MakeVoteResponse = "MakeVoteResponse",
    AllVotesDoneResponse = "AllVotesDoneResponse",
    EndGame = "EndGame",
};

export interface GameServerEmitters {
    [GameServer.UpdateGameMembers] : (gameMembers: IUser[]) => void;
    [GameServer.SetField] : (field?: IField) => void;
    [GameServer.SetRound] : (round?: IRound) => void;
    [GameServer.AllReady] : () => void;
    [GameServer.MakeMysteryResponse] : (mystery?: IMystery) => void;
    [GameServer.MakeVoteResponse] : (votes: number[]) => void;
    [GameServer.AllVotesDoneResponse] : (winVote: number) => void;
    [GameServer.EndGame] : () => void;
}

export class GameEmitter {
    io: IO;
    constructor(io: IO) {
        this.io = io;
    }

    updateGameMembers = (gameMembers: IUser[]) => {
        this.io.emit(GameServer.UpdateGameMembers, gameMembers)
    }

    updateField = (field?: IField) => {
        if (field) {
            this.io.emit(GameServer.SetField, field);
            if (isGameFinished(field)) {
                this.io.emit(GameServer.EndGame)
            }
        }
    }

    updateRound = (round?: IRound) => {
        if (round) {
            this.io.emit(GameServer.SetRound, round)
        }
    }

    allReady = () => {
        this.io.emit(GameServer.AllReady)
    }

    makeMysteryResponse = (mystery?: IMystery) => {
        this.io.emit(GameServer.MakeMysteryResponse, mystery)
    }

    makeVoteResponse = (votes: number[]) => {
        this.io.emit(GameServer.MakeVoteResponse, votes)
    }

    allVotesDoneResponse = (winnerVote: number) => {
        this.io.emit(GameServer.AllVotesDoneResponse, winnerVote)
    }

    endGame = () => {
        this.io.emit(GameServer.EndGame);
    }

}
