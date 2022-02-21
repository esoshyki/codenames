import { IState } from "@/types";

export const blueTeam = (state: IState) => state.game.blueTeam;
export const redTeam = (state: IState) => state.game.redTeam;
export const gameMembers = (state: IState) => state.game.gameMembers;

export const gameSelectors = {
    gameMembers,
    blueTeam,
    redTeam
}