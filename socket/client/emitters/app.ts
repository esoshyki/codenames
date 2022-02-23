import { socket } from "..";
import { isDevelop } from "@/utils/isDevelop";

export enum AppClient {
    ResetServerData = "ResetServerData"
}

export interface AppClientEmitters {
    [AppClient.ResetServerData]: () => void;
}

const resetServerData = () => {
    isDevelop() && console.log("Socket-Client/resetServerData");
    socket.emit(AppClient.ResetServerData);
};

export const appEmitters = {
    resetServerData
};