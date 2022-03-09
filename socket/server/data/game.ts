import { IO } from "@/socket/socket.types";
import { IField, IMystery, IRound, Neutrals } from "@/types/game";
import { IUser } from "@/types/users";
import { createField, nextRound } from "../../socket.utils";
import { GameEmitter } from "../emitters/game";

export class GameData {
    private gameMembers: IUser[];
    private field?: IField;
    private round?: IRound;
    private mystery?: IMystery;
    private emitter: GameEmitter;
    private started: boolean;

    constructor (io: IO) {
        this.gameMembers = [];
        this.emitter = new GameEmitter(io);
        this.started = false;
    }

    // GAME MEMBERS

    getGameMembers = () => this.gameMembers;

    setGameMembers = (users: IUser[]) => this.gameMembers = users;

    addGameMember = (user: IUser) => {
        this.gameMembers.push(user);
        this.emitter.updateGameMembers(this.getGameMembers());
        this.emitter.updateField(this.getField());
        this.emitter.updateRound(this.getRound());
    }

    removeGameMember = (user: IUser) => {
        this.gameMembers === this.gameMembers.filter(member => member.userName === user.userName);
        this.emitter.updateGameMembers(this.getGameMembers());
    }

    updateGameMember = (user: IUser) => {
        const index = this.gameMembers.findIndex(usr => usr.userName === user.userName);
        if (user.leader) {
            this.resetTeamLeader(user)
        }
        if (index >= 0) {
            this.gameMembers[index] = user; 
        }
        this.emitter.updateGameMembers(this.getGameMembers());
        if (this.isAllReady()) {
            this.emitter.allReady();
        }

        if (this.allCollectionVotesDone()) {
            this.emitter.updateField(this.getField());
            this.emitter.updateRound(this.getRound());
        }
    }

    reset = () => {
        this.setGameMembers([]);
        this.field = undefined;
        this.round = undefined;
        this.started = false;
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

    getStarted = () => this.started;

    getField = () => this.field;

    getRound = () => this.round;

    // MYSTERY

    createMystery = (keyword: string, selectedCards: number[]) => {
        this.mystery = {
            keyword,
            selectedCards,
            answers: 0
        }
        this.emitter.makeMysteryResponse(this.getMystery());
    };

    getMystery = () => this.mystery;

    resetMystery = () => this.mystery = undefined;

    addMysteryAnswer = () => {
        if (this.mystery) {
            this.mystery.answers += 1;

            if (this.mystery.answers - this.mystery.selectedCards.length === 1) {
                this.nextRound();
            }
        }
    }

    // VOTES

    allVotesDone = () => {
        const currentTeam = this.round?.check;

        if (currentTeam && this.field?.cards) {
            const voters = this.gameMembers
                .filter(member => member.team === currentTeam && !member.leader).length;

            const votes = this.field.cards.reduce((acc, next) => {
                return acc + next.votes
            }, 0);

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

    allCardsCovered = () => {
        if (this.round && this.field) {
            const check = this.round.check;
            const rest = this.field.cards.filter(card => card.type === check);

            if (rest.every(card => card.covered)) return true;

            return false
        }

        return false
    }

    endGame = () => {
        this.reset();
        this.emitter.updateField();
        this.emitter.endGame();
    }

    addVote = (cardId: number) => {
        if (this.field?.cards) {
            this.field.cards[cardId].votes += 1;
        }
        if (this.allVotesDone()){
            const winnerVote = this.getWinnerVote();
            if (typeof winnerVote === "number") {
                this.clearVote();
                this.emitter.allVotesDoneResponse(winnerVote);
                setTimeout(() => {
                    const success = this.closeCard(winnerVote);
                    if (this.allCardsCovered()) {
                        this.emitter.updateField(this.getField());
                        return this.endGame();
                    }

                    if (success === true) {
                        this.addMysteryAnswer();
                        this.emitter.updateField(this.getField());
                        this.emitter.makeMysteryResponse(this.getMystery())
                    };

                    if (success === false) {

                        if (this.field?.cards[winnerVote].type === Neutrals.black) {
                            this.emitter.updateField(this.getField());
                            return this.endGame()
                        }
                        this.emitter.updateField(this.getField());
                        this.emitter.updateRound(this.getRound());
                        this.emitter.makeMysteryResponse();
                    }
                
                }, 3000)
            }
        } else {
            this.emitter.updateField(this.getField());
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
        return success;
    }

    nextRound = () => {
        if (this.round && this.field) {
            const number = this.round.number + 1;
            this.round = nextRound(number, this.field.start);
        }
        this.resetMystery();
        this.emitter.updateRound(this.getRound());
        this.emitter.makeMysteryResponse(this.getMystery());
        this.started = true;
    }

    getPassVotes = () => {
        if (this.round) {
            return this.round.passVotes;
        }
    }

    makePassVote = () => {
        if (this.round) {
            this.round.passVotes += 1;
        };

        const currentTeam = this.round?.check;
        const votes = this.getPassVotes();
        if (currentTeam && votes) {
            const voters = this.gameMembers
                .filter(member => member.team === currentTeam && !member.leader).length;

            if (votes === voters) {
                this.nextRound()
            }
        };
    }

    exitGame = () => {
        this.reset();
        this.emitter.updateField();
        this.emitter.updateRound();
        this.emitter.updateGameMembers(this.getGameMembers());
    }

}