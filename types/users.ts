import { Sides } from "./game";

export type IUser = {
    userName?: string;
    team?: Sides,
    leader?: true,
    socketId?: string,
    ready?: true,
    collectionVote?: number
};

export interface ITeam {
    side: Sides;
    members: IUser[];
};