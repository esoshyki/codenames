import { IUser  } from "./users";

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
    id: number;
    type: Sides | Neutrals;
    covered: boolean;
    votes: number;
    mystered?: true;
    selected?: true;
};

export interface IField {
    start: Sides,
    cards: ICard[]
};

export interface IRound {
    check: Sides;
    time: number;
    number: number;
    keyword?: string;
    passVotes: number;
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

export interface ITeam {
    members: IUser[]
}

export interface IMystery {
    selectedCards: number[];
    answers: number;
    keyword: string;
}

export interface IGame {
    field?: IField;
    round?: IRound;
    statistic?: IStatistics;
    results?: IResults;
    redTeam: ITeam;
    blueTeam: ITeam;
    gameMembers: IUser[];
    selectedCards: number[];
    mystery?: IMystery;
    cardVotes: number[];
    winnerVote?: number;
};