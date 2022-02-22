import { ClientToServer, ServerToClient, InterServerEvents, SocketData  } from "../../socket.types";
import { Server as ServerIO } from "socket.io";
import { IUser } from "@/types/users";
import { SServer } from "../../socket.types";

export const createAppEmitter = (
    io: ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>
) => {

    return ({
        resetServer: () => {
            io.emit(SServer.ResetServerResponse)
        },
    })
}