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