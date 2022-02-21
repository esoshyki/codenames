import { socket } from "..";
import { SClient } from "@/socket/socket.types";
import { IUser } from "@/types/users";
import { isDevelop } from "@/utils/isDevelop";

const startGameRequest = (user: IUser) => {
    isDevelop() && console.log("Socket-Client/startGameRequest, data: ", user);
    socket.emit(SClient.StartGameRequest, user);
}

const updateGameMember = (user: IUser) => {
    isDevelop() && console.log("Socket-Client/updateGameMember, data: ", user);
    socket.emit(SClient.UpdateGameMember, user)
}

export const gameEmitters = {
    startGameRequest,
    updateGameMember
}