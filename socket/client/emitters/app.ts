import { socket } from "..";
import { isDevelop } from "@/utils/isDevelop";
import { IMessage } from "@/types/chat";

export enum AppClient {
    ResetServerData = "ResetServerData",
    SendMessage = "SendMessage",
}

export interface AppClientEmitters {
    [AppClient.ResetServerData]: () => void;
    [AppClient.SendMessage] : (message: IMessage) => void;
}

export const appEmitters = {
    resetServerData: () => {
        isDevelop() && console.log("Socket-Client/resetServerData");
        socket.emit(AppClient.ResetServerData);
    },

    sendMessage: (message: IMessage) => {
        socket.emit(AppClient.SendMessage, message)
    }
}
