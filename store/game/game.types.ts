import { Collection } from "utils/wordCollections";

export enum GameActions {
    START_GAME_REQUEST = "Game/Start-Game-Request",
    SET_GAME_MEMBERS = "Game/Set-Game-Members",
    SET_TEAM_REQUEST = "Game/Set-Team-Request",
    SET_LEADER_REQUEST = "Game/Set-Leader-Request",
    TOGGLE_READY_REQUEST = "Game/Toggle-Ready-Request",
};

export interface InGameUser {
    userName: string;
    ready: boolean;
    team: Sides | null,
    leader?: true
};

export enum Sides {
    blue = "blue",
    red = "red",
}

export interface GameData {
    guesserData: string | null;
    startSide: Sides | null;
    fieldData: string[] | null,
    collection: Collection | null,

    round: {
        number: number,
        side: Sides | null,
        votes: number[]
    };
};

export interface IGameState {
    gameMembers: InGameUser[];
    gameData: GameData;
}
