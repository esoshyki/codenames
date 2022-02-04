import { IState } from "../types";

export const getGameData = (state: IState) => state.game.gameData;
export const getGameMembers = (state: IState) => state.game.gameMembers;
export const getMystery = (state: IState) => state.game.gameData.round.mystery;
export const getRoundVotes = (state: IState) => state.game.gameData.round.votes;