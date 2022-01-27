import { InGameUser, Sides } from "@/store/game/game.types";

export const teamsAreComplete = (gameMembers: InGameUser[]) => {
    const redTeamCount = gameMembers.filter((member) => member.team === Sides.red).length;
    const blueTeamCount = gameMembers.filter((member) => member.team === Sides.blue).length;

    return redTeamCount >= 2 && blueTeamCount >= 2;
}