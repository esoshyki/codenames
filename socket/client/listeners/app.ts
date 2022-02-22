import { SServer } from "@/socket/socket.types";
import { appRestart } from "@/store/app/app.actions";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { socket } from "..";

export const setAppListeners = (dispatch: Dispatch<AnyAction>) => {
    socket.on(SServer.ResetServerResponse, () => {
        dispatch(appRestart());
    })
}