import { SServer } from "@/socket/socket.types";
import { allReadyRequest, setFieldRequest, setMystery, setRound, setWinnerVote, updateGameMembersRequest } from "@/store/game/game.actions";
import { IField, IMystery, IRound } from "@/types/game";
import { IUser } from "@/types/users";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { socket } from "..";

export const setGameListeners = (dispatch: Dispatch<AnyAction>) => {
    socket.on(SServer.UpdateGameMembers, (gameMembers: IUser[]) => {
        dispatch(updateGameMembersRequest(gameMembers))
    })

    socket.on(SServer.allReady, () => {
        dispatch(allReadyRequest());
    })

    socket.on(SServer.SetField, (field: IField) => {
        dispatch(setFieldRequest(field));
        dispatch(setWinnerVote());
    })

    socket.on(SServer.SetRound, (round: IRound) => {
        dispatch(setRound(round));
    })

    socket.on(SServer.MakeMysteryResponse, (mystery?: IMystery) => {
        dispatch(setMystery(mystery))
    })

    socket.on(SServer.AllVotesDoneResponse, (winner: number) => {
        dispatch(setWinnerVote(winner));
    });

}