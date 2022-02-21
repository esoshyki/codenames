import { ITeam } from "@/types/game";

export const teamsComplete = (
    blueTeam: ITeam, 
    redTeam: ITeam) => {

        return blueTeam.members.length >= 2 && redTeam.members.length >=2
}