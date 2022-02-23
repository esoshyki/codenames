import { IO } from "@/socket/socket.types";
import { IUser } from "@/types/users";
import { ConnectionServerEmitter } from "../emitters/connection";

export class ConnectionData {
    private users: IUser[];
    private emitter: ConnectionServerEmitter;

    constructor(io: IO) {
        this.users = [];
        this.emitter = new ConnectionServerEmitter(io);
    }

    findUser = (user: IUser) => this.users.find(u => u.userName === user.userName);

    addUser = (user: IUser) => this.users.push(user);

    getAllUsers = () => {
        return this.users
    };

    getConnectedUsers = () => this.users = this.users.filter(user => user.socketId);

    getNamesUsers = () => this.users = this.users.filter(user => user.userName);

    setSocketId = (user: IUser) => {
       this.addUser(user);
       this.emitter.updateOnlineUsers(this.getAllUsers());
    };

    removeUserBySocketId = (socketId: string) => {
        this.users = this.users.filter(user => user.socketId !== socketId);
        this.emitter.updateOnlineUsers(this.getAllUsers());
    }

    disconnectUser = (socketId: string) => {
        const user = this.users.find(user => user.socketId === socketId);
        if (user) {
            if (!user.userName) {
                this.removeUserBySocketId(socketId)
            } else {
                user.socketId = undefined;
            }
        };
        this.emitter.updateOnlineUsers(this.getAllUsers());
    };

    setUserName = (user: IUser) => {
        const onlineUser = this.users.find(ouser => ouser.socketId === user.socketId);
        if (onlineUser) {
            onlineUser.userName = user.userName;
        };
        this.emitter.updateOnlineUsers(this.getAllUsers());
    };

    reset = () => {
        this.users = [];
        this.emitter.updateOnlineUsers(this.getAllUsers());
    }

};

