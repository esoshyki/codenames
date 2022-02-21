import { socket } from "..";
import { SClient } from "@/socket/socket.types";
import { IUser } from "@/types/users";
import { isDevelop } from "@/utils/isDevelop";

const startGameRequest = (user: IUser) => {
    isDevelop() && console.log("Socket-Client/startGameRequest, data: ", user);
    socket.emit(SClient.StartGameRequest, user);
};

export const gameEmitters = {
    startGameRequest
};