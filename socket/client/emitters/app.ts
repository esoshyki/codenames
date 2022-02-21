import { socket } from "..";
import { SClient } from "@/socket/socket.types";
import { isDevelop } from "@/utils/isDevelop";

const resetServerData = () => {
    isDevelop() && console.log("Socket-Client/resetServerData");
    socket.emit(SClient.ResetServerData);
};

export const appEmitters = {
    resetServerData
};