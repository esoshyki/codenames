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

const makeMysteryRequest = (keyword: string, selectedItems: number[]) => {
    isDevelop() && console.log("Socket-Client/makeMysteryRequest, data: ", keyword, selectedItems);
    socket.emit(SClient.MakeMysteryRequest, keyword, selectedItems)
}

const makeVoteRequest = (cardId: number) => {
    isDevelop() && console.log("Socket-Client/makeVoteRequest, cardId: ", cardId);
    socket.emit(SClient.MakeVoteRequest, cardId);
}

export const gameEmitters = {
    startGameRequest,
    updateGameMember,
    makeMysteryRequest,
    makeVoteRequest
}