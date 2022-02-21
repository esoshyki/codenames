import { Sides } from "./game";

export type IUser = {
    userName?: string;
    team?: Sides,
    leader?: true,
    socketId?: string,
    ready?: true,
};

export interface ITeam {
    side: Sides;
    members: IUser[];
};