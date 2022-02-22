import { IState } from "@/types";

export const blueTeam = (state: IState) => state.game.blueTeam;
export const redTeam = (state: IState) => state.game.redTeam;
export const gameMembers = (state: IState) => state.game.gameMembers;
const field = (state: IState) => state.game.field;
const round = (state: IState) => state.game.round;
const selectedCards = (state: IState) => state.game.selectedCards;
const mystery = (state: IState) => state.game.mystery;
const winnerVote = (state: IState) => state.game.winnerVote;

export const gameSelectors = {
    gameMembers,
    blueTeam,
    redTeam,
    field,
    round,
    selectedCards,
    mystery,
    winnerVote
}