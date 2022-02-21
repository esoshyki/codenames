import { ITeam } from "@/types/users";

export const teamsComplete = (
    blueTeam: ITeam, 
    redTeam: ITeam) => {

        return blueTeam.members.length >= 2 && redTeam.members.length >=2
}