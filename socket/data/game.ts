import { IField } from "@/types/game";
import { IUser } from "@/types/users";
import { getWords } from "@/utils/wordCollections";
import { getGuesserData, createCard } from "../socket.utils";

export class GameData {
    private gameMembers: IUser[];
    private field?: IField;

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

    isAllReady = () => {
        const allReady = this.gameMembers.every(member => member.ready);

        if (allReady) {
            this.gameMembers.forEach(member => {
                member.ready = undefined;
            })
        };

        return allReady;
    };

    allCollectionVotesDone = () => {
        const allDone = this.gameMembers.every(member => typeof member.collectionVote === "number");
        if (allDone) {
            const winner = this.gameMembers
                .sort(() => 0.5 - Math.random())
                .map(member => member.collectionVote)
                .sort((a: number | undefined, b: number | undefined) => 
                    this.gameMembers.filter(member => member.collectionVote === a).length - 
                    this.gameMembers.filter(member => member.collectionVote === b).length )[0]

            if (winner) {
                const guesserData = getGuesserData();

                this.field = {
                    cards: getWords(winner).map((text, idx) => createCard(text, guesserData[idx])),
                }
            }
        }
        return allDone;
    };

    getField = () => this.field;

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