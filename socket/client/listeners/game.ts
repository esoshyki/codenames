import { allReadyRequest, engGameRequest, setFieldRequest, setMystery, setRound, setWinnerVote, updateGameMembersRequest } from "@/store/game/game.actions";
import { IField, IMystery, IRound } from "@/types/game";
import { IUser } from "@/types/users";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { socket } from "..";
import { GameServer } from "@/socket/server/emitters/game";

export const setGameListeners = (dispatch: Dispatch<AnyAction>) => {
    socket.on(GameServer.UpdateGameMembers, (gameMembers: IUser[]) => {
        console.log("Here");
        dispatch(updateGameMembersRequest(gameMembers))
    })

    socket.on(GameServer.AllReady, () => {
        dispatch(allReadyRequest());
    })

    socket.on(GameServer.SetField, (field: IField) => {
        dispatch(setFieldRequest(field));
        dispatch(setWinnerVote());
    })

    socket.on(GameServer.SetRound, (round: IRound) => {
        dispatch(setRound(round));
    })

    socket.on(GameServer.MakeMysteryResponse, (mystery?: IMystery) => {
        dispatch(setMystery(mystery))
    })

    socket.on(GameServer.AllVotesDoneResponse, (winner: number) => {
        dispatch(setWinnerVote(winner));
    });

    socket.on(GameServer.EndGame, () => {
        dispatch(engGameRequest())
    })

}