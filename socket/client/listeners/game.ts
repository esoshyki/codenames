import { SServer } from "@/socket/socket.types";
import { updateGameMembersRequest } from "@/store/game/game.actions";
import { IUser } from "@/types/users";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { socket } from "..";

export const setGameListeners = (dispatch: Dispatch<AnyAction>) => {
    socket.on(SServer.UpdateGameMembers, (gameMembers: IUser[]) => {
        dispatch(updateGameMembersRequest(gameMembers))
    })
}