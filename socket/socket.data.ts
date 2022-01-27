import { InGameUser, GameData, Sides } from "@/store/game/game.types";
import { User } from "@/types";
import { ChatMessage } from "@/store/chat/chat.types";

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
        round: {
            number: 0,
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
        if (this.gameMembers.every((member) => member.userName !== user.userName)) {
            const inGameUser = this.createGameMember(user);
            this.gameMembers.push(inGameUser);
        };
    }

    getGameMembers() {
        return this.gameMembers
    };

    setTeam(user: User, side: Sides | null) {
        const userIndex = this.gameMembers.findIndex(mbr => mbr.userName === user.userName);
        if (userIndex >= 0) {
            this.gameMembers[userIndex].team = side;
        };
    }
}

export default ServerData;

