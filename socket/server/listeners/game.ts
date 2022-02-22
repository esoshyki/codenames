import { SClient, SServer } from "../../socket.types";
import { Server as ServerIO } from "socket.io";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../../socket.types";
import { IUser } from "@/types/users";
import { ServerData } from "@/socket/data";
import { createGameEmitter } from "../emitters/game";

export const addGameEmitters = 
    (
        socket: any, io: ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>,
        serverData: ServerData
    ) => {

        const emitter = createGameEmitter(io);

        socket.on(SClient.StartGameRequest, (user: IUser) => {
            serverData.game.addGameMember(user);
            emitter.updateGameMembers(serverData.game.getGameMembers())
        });

        socket.on(SClient.UpdateGameMember, (user: IUser) => {
            serverData.game.updateGameMember(user);
            emitter.updateGameMembers(serverData.game.getGameMembers())
            if (serverData.game.isAllReady()) {
                emitter.allReady();
                emitter.updateGameMembers(serverData.game.getGameMembers())
            };

            if (serverData.game.allCollectionVotesDone()) {
                const field = serverData.game.getField();
                const round = serverData.game.getRound();
                emitter.updateField(field);
                emitter.updateRound(round);
            };
        });

        socket.on(SClient.MakeMysteryRequest, (keyword: string, selectedItems: number[]) => {
            serverData.game.createMystery(keyword, selectedItems);
            emitter.makeMysteryResponse(serverData.game.getMystery());
        })

        socket.on(SClient.MakeVoteRequest, (cardId: number) => {
            serverData.game.addVote(cardId);
            if (serverData.game.allVotesDone()) {
                const winnerVote = serverData.game.getWinnerVote();

                if (typeof winnerVote === "number") {
                    serverData.game.clearVote();
                    emitter.allVotesDoneResponse(winnerVote);
                    
                    setTimeout(() => {
                        const success = serverData.game.closeCard(winnerVote);

                        if (success === true) {
                            emitter.updateField(serverData.game.getField());
                        };

                        if (success === false) {
                            emitter.updateField(serverData.game.getField());
                            emitter.updateRound(serverData.game.getRound());
                            emitter.makeMysteryResponse();
                        }
                    
                    }, 3000)
                }
            } else {
                emitter.updateField(serverData.game.getField());
            }
        })

} 