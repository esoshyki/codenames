import { InGameUser, Sides } from "@/store/game/game.types";
import { User } from "@/types";

export const getCurrentMember = (gameMembers: InGameUser[], currentUser: User | null) : InGameUser | undefined => {
    if (!currentUser) return undefined;
    return gameMembers.find(member => member.userName === currentUser.userName)
};

export const getTeamates = (gameMembers: InGameUser[], currentUser: User | null) : InGameUser[] => {
    if (!currentUser) return [];
    const gameMember = getCurrentMember(gameMembers, currentUser);
    return gameMembers.filter(member => member.team === gameMember?.team);
};

export const isLeader = (gameMembers: InGameUser[], currentUser: User | null) : boolean => {
    const gameMember = getCurrentMember(gameMembers, currentUser);
    return gameMember?.leader || false
};

export const noTeamLeader = (gameMembers: InGameUser[], currentUser: User | null) : boolean => {
    const teamates = getTeamates(gameMembers, currentUser);
    return teamates.some(teamate => teamate.leader);
};

export const getUserTeam = (gameMembers: InGameUser[], currentUser: User | null) : Sides | null=> {
    const member = gameMembers.find(member => member.userName === currentUser?.userName);
    if (!member) return null;
    return member.team
};

export const getOppositeTeam = (gameMembers: InGameUser[], currentUser: User | null) : Sides | null => {
    const team = getUserTeam(gameMembers, currentUser);
    if (!team) return team;
    const oppositeTeam = team === Sides.blue ? Sides.red : Sides.blue;
    return oppositeTeam
};

export const getUsersCards = (fieldVotes: number[], guesserData: string[], side: Sides) : number => {
    return guesserData.filter((guesserSide, idx) => guesserSide === side && !fieldVotes.includes(idx)).length;
};

export const getUserCardsRest = (
    fieldVotes: number[], 
    guesserData: string[], 
    gameMembers: InGameUser[], 
    currentUser: User | null
    ) : string => {
    const team = getUserTeam(gameMembers, currentUser);
    if (!team) return "";
    return "" + getUsersCards(fieldVotes, guesserData, team);
};

export const getOppositeCardsRest = (
    fieldPicks: number[],
    guesserData: string[],
    team: Sides
) : string => {
    return "" + getUsersCards(fieldPicks, guesserData, team)
};

export const whosCheck = (roundNumber: number, startTeam?: Sides,) => {
    if (!startTeam) return null;
    const secondTeam = startTeam === Sides.blue ? Sides.red : Sides.blue;
    const activeTeam = roundNumber % 2 ? startTeam : secondTeam;
    return activeTeam;
}

