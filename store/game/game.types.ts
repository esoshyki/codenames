import { IUser } from "../types";
import { Collection } from "utils/wordCollections";

export enum GameActions {
    SET_GUESSER_DATA = "Game/Set-Guesser-Data",
    SET_START_SIDE = "Game/Set-Start-Side",
    SET_COLLECTION = "Game/Set-Collection",
    SET_FIELD_DATA = "Game/Set-Field-Data",
    SET_READY_REQUEST = "Game/Set-Ready-Request",
    SET_UNREADY_REQUEST = "Game/Set-Unready-Request",
    SET_MEMBERS = "Game/Set-Members",
    SET_WANTED_TO_START = "Game/Set-Wanted-To-Start",
    GAME_START_REQUEST = "Game/Game-Start-Request",
    GET_WORDS_REQUEST = "Game/Get-Words-Request",
    GET_READY_USERS_REQUEST = "Game/Get-Ready-Users-Request",
    GET_VOTED_TO_START = "Game/Get-Wanted-To-Start"
}

export interface IGameState {
    guesserData: string[];
    startSide: "blue" | "red" | null;
    members: IUser[];
    votedToStart: IUser[];
    redLeader: IUser | null;
    blueLeader: IUser | null;
    redProposer: IUser | null;
    blueProposer: IUser | null;
    ready: boolean;
    processing: boolean;
    fieldData: string[] | null;
    collection: Collection | null;
    chosenCards: string[];
}
