import { IField, IMystery, IRound, Sides } from "@/types/game";
import { IUser } from "@/types/users";
import { createField, nextRound } from "../socket.utils";

export class GameData {
    private gameMembers: IUser[];
    private field?: IField;
    private round?: IRound;
    private mystery?: IMystery;

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
    }

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
    }

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
                this.field = createField(winner);
                this.round = nextRound(1, this.field.start);
            }
        }
        return allDone;
    }

    getField = () => this.field;

    getRound = () => this.round;

    // MYSTERY

    createMystery = (keyword: string, selectedCards: number[]) => {
        this.mystery = {
            keyword,
            selectedCards,
            answers: 0
        }
    };

    getMystery = () => this.mystery;

    resetMystery = () => this.mystery === undefined;

    updateGameMember = (user: IUser) => {
        const index = this.gameMembers.findIndex(usr => usr.userName === user.userName);
        if (user.leader) {
            this.resetTeamLeader(user)
        }
        if (index >= 0) {
        this.gameMembers[index] = user; 
        }
    }

    addMysteryAnswer = () => {
        if (this.mystery) {
            this.mystery.answers += 1;
        }
    }

    // VOTES

    allVotesDone = () => {
        const currentTeam = this.round?.check;

        if (currentTeam && this.field?.cards) {
            const voters = this.gameMembers
                .filter(member => member.team === currentTeam && !member.leader).length;

            const votes = this.field.cards
                .filter(card => card.votes > 0).length;

            return voters === votes
        };
        return false
    }

    getWinnerVote = () => {
        if (this.field?.cards) {
            return this.field.cards.filter(card => card.votes > 0).sort((a, b) => b.votes - a.votes)
            .sort(() => 0.5 - Math.random())[0].id;
        };
    };

    clearVote = () => {
        if (this.field) {
            this.field.cards.forEach(card => card.votes = 0);
        }
    }

    addVote = (cardId: number) => {
        if (this.field?.cards) {
            this.field.cards[cardId].votes += 1;
        }
    }

    closeCard = (cardId: number) => {
        if (!this.field) return;
        if (!this.round) return;
        const card = this.field.cards[cardId];
        const success = card.type === this.round.check;
        card.covered = true;
        
        if (!success) {
            this.nextRound();
        }
        this.addMysteryAnswer()
        return success;
    }

    nextRound = () => {
        if (this.round && this.field) {
            const number = this.round.number + 1;
            this.round = nextRound(number, this.field.start);
            this.resetMystery();
        }
    }

}