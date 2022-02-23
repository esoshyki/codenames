import { ConnectionData } from "./connection";
import { GameData } from "./game";

export class ServerData {
    connection: ConnectionData;
    game: GameData;
    constructor() {
        this.connection = new ConnectionData();
        this.game = new GameData();
    }

    reset = () => {
        this.connection.reset();
        this.game.reset();
    }
}