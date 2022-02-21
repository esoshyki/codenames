import { SClient, SServer } from "../../socket.types";
import { Server as ServerIO } from "socket.io";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../../socket.types";
import { IUser } from "@/types/users";
import { ServerData } from "@/socket/data";

export const addGameEmitters = 
    (
        socket: any, io: ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>,
        serverData: ServerData
    ) => {

        socket.on(SClient.StartGameRequest, (user: IUser) => {
            serverData.game.addGameMember(user);
            io.emit(SServer.UpdateGameMembers, serverData.game.getGameMembers());
        });

        socket.on(SClient.UpdateGameMember, (user: IUser) => {
            console.log("Server/Update-Game-Member", (user));
            serverData.game.updateGameMember(user);
            io.emit(SServer.UpdateGameMembers, serverData.game.getGameMembers());
        })

} 