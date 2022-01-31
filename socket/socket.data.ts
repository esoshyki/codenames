import { InGameUser, GameData, Sides, CollectionVote, GameStages } from "@/store/game/game.types";
import { User } from "@/types";
import { ChatMessage } from "@/store/chat/chat.types";
import { getWords } from "@/utils/wordCollections";
import { getGuesserData } from "@/utils/getGuesser";
import { allCollectionVotesDone, allReady, teamHasLeaders, teamsAreComplete } from "@/utils/teams";

interface SocketUser {
    userName: string;
    socketId: string;
};

interface SocketServerData {
    onlineUsers: SocketUser[];
    chatMessages: ChatMessage[];
    gameData: GameData;
    gameMembers: InGameUser[];
};

class ServerData implements SocketServerData {
    onlineUsers : SocketUser[]= [];
    chatMessages : ChatMessage[] = [];
    gameMembers : InGameUser[] = [];
    gameData: GameData = {
        guesserData: null,
        startSide: null,
        fieldData: null,
        collection: null,
        collectionVotes: [],
        stage: {
            round: GameStages.noGame,
            side: null,
            votes: []
        }
    };

    constructor() {}

    // USER

    disconnectUser (socketId: string) {
        this.onlineUsers = this.onlineUsers.filter((user: SocketUser) => user.socketId !== socketId);
    };

    loginUser (user: SocketUser) {
        if (this.onlineUsers.every((onlineUser) => onlineUser.userName !== user.userName)) {
            this.onlineUsers.push(user);
        }
    };

    getOnlineUsers() {
        return this.onlineUsers;
    };

    getServerData() {
        const { onlineUsers, chatMessages, gameMembers, gameData } = this;
        return { onlineUsers, chatMessages, gameMembers, gameData }
    };

    // MESAGGES

    addMessage(message: ChatMessage) {
        this.chatMessages.push(message)
    };

    getMessages() {
        return this.chatMessages
    };

    // GAME

    createGameMember(user: User) : InGameUser {
        return ({
            userName: user.userName,
            team: null,
            ready: false,
        })
    }

    startGame(user: User) {
        if (!this.gameMembers.length) {
            return this.gameMembers.push(this.createGameMember(user));
        };
        if (this.gameMembers.every((member) => member.userName !== user.userName)) {
            return this.gameMembers.push(this.createGameMember(user));
        };
    }

    getGameMembers() {
        return this.gameMembers
    };

    getGameMemberIdx(userName: string) {
        return this.gameMembers.findIndex(mbr => mbr.userName === userName);
    };

    setLeader(userName: string, team: Sides) {
        this.gameMembers = this.gameMembers.map((member) => {
            if (member.team !== team) return member;
            if (member.userName === userName) return {...member, leader: true};

            return {...member, leader: undefined}
        });
    };

    unSetLeader() {
        this.gameMembers = this.gameMembers.map(member => member.leader ? {...member, leader: undefined} : member);
    };

    setTeam(user: User, side: Sides | null) {
        const userIndex = this.getGameMemberIdx(user.userName);
        if (userIndex >= 0) {
            const currentSide = this.gameMembers[userIndex].team;
            this.gameMembers[userIndex].team = side !== currentSide ? side : null;

            if (!side) {
                return;
            }

            if (this.gameMembers.filter(member => member.team === side && member.leader).length > 0) {
                this.gameMembers[userIndex].leader = undefined;
            }
  
        };
    };

    toggleLeader(user: User) {
        const userIndex = this.getGameMemberIdx(user.userName);
        const { leader, team } = this.gameMembers[userIndex];
        if (!team) return;

        if (leader) {
            this.unSetLeader()
        } else {
            this.setLeader(user.userName, team);
        };
    };

    toggleReady(userName: string) {
        const uidx = this.getGameMemberIdx(userName);
        const { ready } = this.gameMembers[uidx];
        this.gameMembers[uidx].ready = !ready;
    };

    toggleCollectionVote(userName: string, collectionIdx: number) {
        const vote = this.gameData.collectionVotes.find(user => user.userName === userName);

        if (vote) {
            return this.gameData.collectionVotes = this.gameData.collectionVotes.filter(user => user.userName !== userName);
        };

        return this.gameData.collectionVotes.push({
            userName,
            collectionIdx
        });
    };

    getCollectionVotes() : CollectionVote[] {
        return this.gameData.collectionVotes;
    }

    setFieldData(collectionIdx: number) {
        const fieldData = getWords(collectionIdx);
        this.gameData.fieldData = fieldData;
    };

    getFieldData = () => this.gameData.fieldData;

    setGuesserData() {
        const guesserData = getGuesserData();
        this.gameData.guesserData = guesserData;
    };

    getGuesserData = () => this.gameData.guesserData;

    gameStateTrigger = () => {

        if (this.gameData.stage.round === GameStages.noGame) {
            if (this.gameMembers.length === 1) {
                return GameStages.preStart;
            }
        }

        if (this.gameData.stage.round === GameStages.preStart) {
            if (
                teamsAreComplete(this.gameMembers) &&
                teamHasLeaders(this.gameMembers) &&
                allReady(this.gameMembers) 
                ) {
                    return GameStages.selectCollection;
                }
        };

        if (this.gameData.stage.round === GameStages.selectCollection) {
            if (allCollectionVotesDone(this.gameData.collectionVotes, this.gameMembers)) {
                return GameStages.prepareField;
            }
        }

        return null;
    }

}

export default ServerData;

