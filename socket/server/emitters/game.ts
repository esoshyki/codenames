import { IO } from "../../socket.types";
import { IUser } from "@/types/users";
import { SServer } from "../../socket.types";
import { IField, IMystery, IRound } from "@/types/game";

export const createGameEmitter = (
    io: IO
) => {

    return ({
        updateGameMembers: (gameMembers: IUser[]) => {
            io.emit(SServer.UpdateGameMembers, gameMembers)
        },

        updateField: (field?: IField) => {
            if (field) {
                io.emit(SServer.SetField, field)
            }
        },

        updateRound: (round?: IRound) => {
            if (round) {
                io.emit(SServer.SetRound, round)
            }
        },

        allReady: () => {
            io.emit(SServer.allReady)
        },

        makeMysteryResponse: (mystery?: IMystery) => {
            io.emit(SServer.MakeMysteryResponse, mystery)
        },

        makeVoteResponse: (votes: number[]) => {
            io.emit(SServer.MakeVoteResponse, votes)
        },

        allVotesDoneResponse: (winnerVote: number) => {
            io.emit(SServer.AllVotesDoneResponse, winnerVote)
        }
    })
}
