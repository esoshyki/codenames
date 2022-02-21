import { IUser } from "@/types/users";

export class GameData {
    private gameMembers: IUser[];

    constructor () {
        this.gameMembers = [];
    }

    addGameMember = (user: IUser) => {
        this.gameMembers.push(user);
    }

    removeGameMember = (user: IUser) => {
        this.gameMembers === this.gameMembers.filter(member => member.userName === user.userName);
    }

    getGameMembers = () => this.gameMembers;

    reset = () => {
        this.gameMembers = [];
        console.log("ServerData.gameData.reset");
    };

    resetTeamLeader = (user: IUser) => {
        this.gameMembers.forEach(member => {
            if (user.team === member.team) {
                member.leader = undefined
            }
        })
    }

    updateGameMember = (user: IUser) => {
        const index = this.gameMembers.findIndex(usr => usr.userName === user.userName);
        if (user.leader) {
            this.resetTeamLeader(user)
        }
        if (index >= 0) {
        this.gameMembers[index] = user; 
        }
    }

}