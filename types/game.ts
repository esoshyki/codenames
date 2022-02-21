import { ITeam, IUser  } from "./users";

export enum Sides {
    red = "red",
    blue = "blue"
};

export enum Neutrals {
    white = "white",
    black = "black"
};

export interface ICard {
    text: string;
    type: Sides | Neutrals;
    covered: boolean;
    votes: IUser[]
};

export interface IField {
    cards: ICard[]
};

export interface IRound {
    check: Sides;
    time: number;
    number: number;
};

export interface IResults {
    winner: Sides;
    bestPlayer: IUser;
    worstPlayer: IUser
};

export interface IUserStats {
    user: IUser;
    rate: number;
};

export interface IStatistics {
    users: IUserStats[]
};

export interface IGame {
    field: IField;
    round?: IRound;
    statistic?: IStatistics;
    results?: IResults;
    redTeam: ITeam;
    blueTeam: ITeam;
    gameMembers: IUser[];
};