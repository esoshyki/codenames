import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData} from "./socket.types";
import { NextApiResponseServerIO } from "@/types/next";
import { SocketClientActions, SocketServerActions } from "./socket.types";
import { ChatMessage } from "@/store/chat/chat.types";
import { User } from '@/types';
import ServerData from "./socket.data";
import { GameStages, Sides } from "@/store/game/game.types";
import { allCollectionVotesDone, getCollectionWinner } from "@/utils/teams";
import { wordCollections } from "@/utils/wordCollections";


const serverData = new ServerData();

export const creatseServerSocket = (res: NextApiResponseServerIO) => {
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
        httpServer, {
            path: "/api/socket",
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
        }   
    });

    const timerEmitter = (time: number) => {
        io.emit(SocketServerActions.SET_TIMER, time);
    }

    const checkStateTrigger = () => {
        const trigger = serverData.gameStageTrigger();
        if (trigger) {
            serverData.setGameStage(trigger);
            io.emit(SocketServerActions.SET_GAME_STAGE, trigger);

            if (trigger === GameStages.prepareField) {
                let timer = 5;

                
                
                const interval = setInterval(() => {
                    timerEmitter(timer)
                    timer --;

                    if (timer <= 0) {
                        clearInterval(interval);
                        io.emit(SocketServerActions.SET_TIMER, null);
                        io.emit(SocketServerActions.SET_GAME_STAGE, GameStages.started)
                    }
                }, 1000)
            }
        };
    }

    io.sockets.on("connection", (socket) => {
        socket.on(SocketClientActions.DISCONNECTING, () => {
            serverData.disconnectUser(socket.id);
            io.emit(SocketServerActions.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
        });

        socket.on(SocketClientActions.UPDATE_ONLINE_USERS_REQUEST, () => {
            io.emit(SocketServerActions.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
        });

        socket.on(SocketClientActions.UPDATE_SERVER_DATA_REQUEST, () => {
            console.log("UPDATE_SERVER_DATA_REQUEST");
            io.emit(SocketServerActions.UPDATE_SERVER_DATA_RESPONSE, serverData.getServerData())
            checkStateTrigger();
        });

        socket.on(SocketClientActions.LOGIN_REQUEST, (user) => {
            serverData.loginUser(user);
            io.emit(SocketServerActions.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
            io.emit(SocketServerActions.LOGIN_RESPONSE, user)
        });

        socket.on(SocketClientActions.LOGOUT_REQUEST, (user) => {
            serverData.disconnectUser(user.socketId);
            io.emit(SocketServerActions.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
        });

        socket.on(SocketClientActions.ADD_MESSAGE_REQUEST, (message: ChatMessage) => {
            serverData.addMessage(message);
            io.emit(SocketServerActions.ADD_MESSAGE_RESPONSE, message);
        });

        socket.on(SocketClientActions.START_GAME_REQUEST, (user: User) => {
            serverData.startGame(user);
            io.emit(SocketServerActions.START_GAME_RESPONSE, serverData.getGameMembers());
            checkStateTrigger();
        });

        socket.on(SocketClientActions.SET_TEAM_REQUEST, (user: User, side: Sides | null) => {
            serverData.setTeam(user, side);
            io.emit(SocketServerActions.UPDATE_GAME_MEMBERS, serverData.getGameMembers());
            console.log("game memvers", serverData.getGameMembers())
            checkStateTrigger();
        });

        socket.on(SocketClientActions.SET_LEADER_REQUEST, (user: User) => {
            serverData.toggleLeader(user);
            io.emit(SocketServerActions.UPDATE_GAME_MEMBERS, serverData.getGameMembers());
            checkStateTrigger();
        });

        socket.on(SocketClientActions.TOGGLE_READY_REQUEST, (userName: string) => {
            serverData.toggleReady(userName);
            io.emit(SocketServerActions.UPDATE_GAME_MEMBERS, serverData.getGameMembers());
            checkStateTrigger();
        });

        socket.on(SocketClientActions.TOOGLE_COLLECTION_VOTE_REQUEST, (userName: string, collectionIdx: number) => {
            serverData.toggleCollectionVote(userName, collectionIdx);
            const votes = serverData.getCollectionVotes();
            const allDone = allCollectionVotesDone(votes, serverData.getGameMembers());

            if (allDone) {
                const collectionIdx = getCollectionWinner(votes);
                serverData.setFieldData(collectionIdx);
                serverData.setGuesserData();
                io.emit(SocketServerActions.SET_COLLECTION, wordCollections[collectionIdx]);
                const fieldData = serverData.getFieldData()

                if (fieldData) {
                    io.emit(SocketServerActions.UPDATE_FIELD_DATA, fieldData)
                };

                const guesserData = serverData.getGuesserData();

                if (guesserData) {
                    io.emit(SocketServerActions.UPDATE_GUESSER_DATA, guesserData)
                };
                checkStateTrigger()
 
            } else {
                io.emit(SocketServerActions.UPDATE_COLLECTION_VOTES, serverData.getCollectionVotes());
            }
        })
    });

    return io;
}