import { IUser } from "@/types/users";

export enum GameClient {
    StartGameRequest = "StartGameRequest",
    UpdateGameMember = "UpdateGameMember",
    MakeMysteryRequest = "MakeMysteryRequest",
    MakeVoteRequest = "MakeVoteRequest",
    MakePassRequest = "MakePassRequest",
    ExitGameRequest = "ExitGameRequest"
};

export interface GameClientEmitters {
    [GameClient.StartGameRequest]: (user: IUser) => void;
    [GameClient.UpdateGameMember]: (user: IUser) => void;
    [GameClient.MakeMysteryRequest] : (keyword: string, selectedItems: number[]) => void;
    [GameClient.MakeVoteRequest] : (cardId: number) => void;
    [GameClient.ExitGameRequest] : () => void;
}

export const gameEmitters = (socket: any) => ({
    startGameRequest : (user: IUser) => socket.emit(GameClient.StartGameRequest, user),
    
    updateGameMember : (user: IUser) => socket.emit(GameClient.UpdateGameMember, user),
    
    makeMysteryRequest : (keyword: string, selectedItems: number[]) => socket.emit(GameClient.MakeMysteryRequest, keyword, selectedItems),
    
    makeVoteRequest : (cardId: number) => socket.emit(GameClient.MakeVoteRequest, cardId),
    
    makePassRequest : () => socket.emit(GameClient.MakePassRequest),

    exitGameRequest: () => socket.emit(GameClient.ExitGameRequest)
})

