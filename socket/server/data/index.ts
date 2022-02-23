import { IO } from "@/socket/socket.types";
import { ConnectionData } from "./connection";
import { GameData } from "./game";

export class ServerData {
    connection: ConnectionData;
    game: GameData;
    constructor(io: IO) {
        this.connection = new ConnectionData(io);
        this.game = new GameData(io);
    }

    reset = () => {
        this.connection.reset();
        this.game.reset();
    }
}