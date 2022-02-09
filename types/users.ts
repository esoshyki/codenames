import { Sides } from "./game";

export type IUser = {
    userName?: string;
    team?: Sides,
    leader?: true,
    socketId?: string
};

export interface ITeam {
    side: Sides;
    members: IUser[];
};