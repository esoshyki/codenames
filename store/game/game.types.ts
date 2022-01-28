import { Collection } from "utils/wordCollections";

export enum GameActions {
    START_GAME_REQUEST = "Game/Start-Game-Request",
    SET_GAME_MEMBERS = "Game/Set-Game-Members",
    SET_TEAM_REQUEST = "Game/Set-Team-Request",
    SET_LEADER_REQUEST = "Game/Set-Leader-Request",
    TOGGLE_READY_REQUEST = "Game/Toggle-Ready-Request",
    SET_STAGE = "Game/Set-Game-Stage",
    TOGGLE_COLLECTION_VOTE_REQUEST = "Game/Toggle-Collection-Vote-Request",
    SET_COLLECTION_VOTES = "Game/Set-Collection-Votes",
    SET_COLLECTION = "Game/Set-Collection",
    SET_FIELD_DATA = "Game/Set-Field-Data",
    SET_GUESSER_DATA = "Game/Set-Guesser-Data"
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
};

export enum GameStages {
    noGame = "noGame",
    preStart = "preStart",
    selectCollection = "selectConnection",
    prepareField = "prepareField"
};

interface RoundVote {
    cardIdx: number;
    userName: string;
};

interface Stage {
    round: GameStages | number;
    side: Sides | null,
    votes: RoundVote[]
};

export interface CollectionVote {
    collectionIdx: number;
    userName: string;
};

export enum GuesserTypes {
    red = "red",
    blue = "blue",
    black = "black",
    white = "white"
}


export interface GuesserType {
    start: GuesserTypes.red | GuesserTypes.blue,
    data: GuesserTypes[]
}

export interface GameData {
    guesserData: GuesserType | null;
    startSide: Sides | null;
    fieldData: string[] | null,
    collection: Collection | null,
    collectionVotes: CollectionVote[],
    stage: Stage
};

export interface IGameState {
    gameMembers: InGameUser[];
    gameData: GameData;
};

