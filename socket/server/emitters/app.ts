import { IMessage } from "@/types/chat";
import { IO } from "../../socket.types";

export enum AppServer {
    ResetServerResponse = "ResetServerResponse",
    SendMessage = "SendMessage"
};

export interface AppServerEmitters {
    [AppServer.ResetServerResponse] : () => void;
    [AppServer.SendMessage] : (message: IMessage) => void;
}

export const createAppEmitter = (
    io: IO,
) => {

    return ({
        resetServer: () => {
            io.emit(AppServer.ResetServerResponse)
        },

        sendMessage: (message: IMessage) => {
            io.emit(AppServer.SendMessage, message)
        }
    })
}