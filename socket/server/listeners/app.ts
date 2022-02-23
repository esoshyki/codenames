import { IO } from "../../socket.types";
import { ServerData } from "@/socket/server/data";
import { createAppEmitter } from "../emitters/app";
import { AppClient } from "@/socket/client/emitters/app";
import { IMessage } from "@/types/chat";

export const addAppEmitters = 
    (
        socket: any, io: IO,
        serverData: ServerData
    ) => {

        const emitter = createAppEmitter(io);

        socket.on(AppClient.ResetServerData, () => {
            serverData.reset();
            emitter.resetServer();
        })

        socket.on(AppClient.SendMessage, (message: IMessage) => {
            emitter.sendMessage(message)
        })

} 