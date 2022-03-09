import { IUser } from "@/types/users";
import { ServerData } from "@/socket/server/data";
import { GameClient } from "@/socket/client/emitters/game";

export const addGameListeners = (socket: any, serverData: ServerData) => {

        socket.on(GameClient.StartGameRequest, (user: IUser) => {
            serverData.game.addGameMember(user);
        });

        socket.on(GameClient.UpdateGameMember, (user: IUser) => {
            serverData.game.updateGameMember(user);
        });

        socket.on(GameClient.MakeMysteryRequest, (keyword: string, selectedItems: number[]) => {
            serverData.game.createMystery(keyword, selectedItems);
        })

        socket.on(GameClient.MakeVoteRequest, (cardId: number) => {
            serverData.game.addVote(cardId);
        })

        socket.on(GameClient.MakePassRequest, () => {
            serverData.game.makePassVote();
        })

        socket.on(GameClient.ExitGameRequest, () => {
            serverData.game.exitGame();
        })
} 