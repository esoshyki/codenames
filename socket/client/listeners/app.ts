import { appRestart } from "@/store/app/app.actions";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { socket } from "..";
import { AppServer } from "@/socket/server/emitters/app";
import { addChatMessageResponse } from "@/store/chat/chat.actions";
import { IMessage } from "@/types/chat";

export const setAppListeners = (dispatch: Dispatch<AnyAction>) => {
    socket.on(AppServer.ResetServerResponse, () => {
        dispatch(appRestart());
    })

    socket.on(AppServer.SendMessage, (message: IMessage) => {
        dispatch(addChatMessageResponse(message))
    })
}