import { IUser } from "@/types/users";

export class GameData {
    private gameMembers: IUser[];

    constructor () {
        this.gameMembers = []
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
    }

}