import { Collection } from "utils/wordCollections";
import { User } from "@/types";

export enum GameActions {
    START_GAME_REQUEST = "Game/Start-Game-Request",
    SET_GAME_MEMBERS = "Game/Set-Game-Members",
};

export interface InGameUser {
    userName: string;
    ready: boolean;
    team: "blue" | "red" | null
};

export interface GameData {
    guesserData: string | null;
    startSide: "blue" | "red" | null;
    leaders: {
        blue: User | null,
        red: User | null,
    },
    fieldData: string[] | null,
    collection: Collection | null,

    round: {
        number: number,
        side: "blue" | "red" | null,
        votes: number[]
    };
};



export interface IGameState {
    gameMembers: InGameUser[];
    gameData: GameData;
}
