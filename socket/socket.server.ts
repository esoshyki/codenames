import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { ClientToServer, ServerToClient, InterServerEvents, SocketData} from "./socket.types";
import { NextApiResponseServerIO } from "@/types/next";
import { SocketClient, SocketServer } from "./socket.types";
import { ChatMessage } from "@/store/chat/chat.types";
import { User } from '@/types';
import ServerData from "./socket.data";
import { GameStages, Mystery, Sides } from "@/store/game/game.types";
import { allCollectionVotesDone, getCollectionWinner } from "./socket.server.utils";
import { wordCollections } from "@/utils/wordCollections";


const serverData = new ServerData();
let interval: any;

export const creatseServerSocket = (res: NextApiResponseServerIO) => {
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO<ClientToServer, ServerToClient, InterServerEvents, SocketData>(
        httpServer, {
            path: "/api/socket",
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
        }   
    });

    const timerEmitter = (time: number) => {
        io.emit(SocketServer.SET_TIMER, time);
    };

    const setRoundInterval = (seconds: number) => {
        let rest = seconds;
        interval = setInterval(() => {
            rest -= 1;
            if (rest < 0) {
                clearInterval(interval);
            };
            io.emit(SocketServer.SET_TIMER, rest)

        }, 1000);
    };

    const setNextRound = () => {
        serverData.setNextRound();
        io.emit(SocketServer.SET_ROUND, serverData.getCurrentRound())
    }

    const checkStateTrigger = () => {
        const trigger = serverData.gameStageTrigger();
        if (trigger) {
            serverData.setGameStage(trigger);
            io.emit(SocketServer.SET_GAME_STAGE, trigger);

            if (trigger === GameStages.prepareField) {
                let timer = 5;

                interval = setInterval(() => {
                    timerEmitter(timer)
                    timer --;

                    if (timer <= 0) {
                        clearInterval(interval);
                        io.emit(SocketServer.SET_TIMER, null);
                        io.emit(SocketServer.SET_GAME_STAGE, GameStages.started);
                        setNextRound();
                        setRoundInterval(3600);
                    }
                }, 1000)
            }
        };
    }

    io.sockets.on("connection", (socket) => {

        socket.on(SocketClient.MAKE_MISTERY_REQUEST, (mystery: Mystery | null) => {
            serverData.setMystery(mystery);
            io.emit(SocketServer.SET_MYSTERY, serverData.getMystery())
        })

        socket.on(SocketClient.DISCONNECTING, () => {
            serverData.disconnectUser(socket.id);
            io.emit(SocketServer.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
        });

        socket.on(SocketClient.UPDATE_ONLINE_USERS_REQUEST, () => {
            io.emit(SocketServer.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
        });

        socket.on(SocketClient.UPDATE_SERVER_DATA_REQUEST, () => {
            console.log("UPDATE_SERVER_DATA_REQUEST");
            io.emit(SocketServer.UPDATE_SERVER_DATA_RESPONSE, serverData.getServerData())
            checkStateTrigger();
        });

        socket.on(SocketClient.LOGIN_REQUEST, (user) => {
            serverData.loginUser(user);
            io.emit(SocketServer.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
            io.emit(SocketServer.LOGIN_RESPONSE, user)
        });

        socket.on(SocketClient.LOGOUT_REQUEST, (user) => {
            serverData.disconnectUser(user.socketId);
            io.emit(SocketServer.CHANGE_ONLINE_USERS, serverData.getOnlineUsers());
        });

        socket.on(SocketClient.ADD_MESSAGE_REQUEST, (message: ChatMessage) => {
            serverData.addMessage(message);
            io.emit(SocketServer.ADD_MESSAGE_RESPONSE, message);
        });

        socket.on(SocketClient.START_GAME_REQUEST, (user: User) => {
            serverData.startGame(user);
            io.emit(SocketServer.START_GAME_RESPONSE, serverData.getGameMembers());
            checkStateTrigger();
        });

        socket.on(SocketClient.SET_TEAM_REQUEST, (user: User, side: Sides | null) => {
            serverData.setTeam(user, side);
            io.emit(SocketServer.UPDATE_GAME_MEMBERS, serverData.getGameMembers());
            console.log("game memvers", serverData.getGameMembers())
            checkStateTrigger();
        });

        socket.on(SocketClient.SET_LEADER_REQUEST, (user: User) => {
            serverData.toggleLeader(user);
            io.emit(SocketServer.UPDATE_GAME_MEMBERS, serverData.getGameMembers());
            checkStateTrigger();
        });

        socket.on(SocketClient.TOGGLE_READY_REQUEST, (userName: string) => {
            serverData.toggleReady(userName);
            io.emit(SocketServer.UPDATE_GAME_MEMBERS, serverData.getGameMembers());
            checkStateTrigger();
        });

        socket.on(SocketClient.TOOGLE_COLLECTION_VOTE_REQUEST, (userName: string, collectionIdx: number) => {
            serverData.toggleCollectionVote(userName, collectionIdx);
            const votes = serverData.getCollectionVotes();
            const allDone = allCollectionVotesDone(votes, serverData.getGameMembers());

            if (allDone) {
                const collectionIdx = getCollectionWinner(votes);
                serverData.setFieldData(collectionIdx);
                serverData.setGuesserData();
                io.emit(SocketServer.SET_COLLECTION, wordCollections[collectionIdx]);
                const fieldData = serverData.getFieldData()

                if (fieldData) {
                    io.emit(SocketServer.UPDATE_FIELD_DATA, fieldData)
                };

                const guesserData = serverData.getGuesserData();

                if (guesserData) {
                    io.emit(SocketServer.UPDATE_GUESSER_DATA, guesserData)
                };
                checkStateTrigger()
 
            } else {
                io.emit(SocketServer.UPDATE_COLLECTION_VOTES, serverData.getCollectionVotes());
            }
        })
    });

    return io;
}