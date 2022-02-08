import { Sides } from "./game";

export interface IUser {
    userName: string;
    team?: Sides,
    leader?: true
};

export interface ITeam {
    side: Sides;
    members: IUser[];
};