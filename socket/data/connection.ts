import { IUser } from "@/types/users";

export class ConnectionData {
    private users: IUser[];

    constructor() {
        this.users = [];
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
    };

    removeUserBySocketId = (socketId: string) => {
        this.users = this.users.filter(user => user.socketId !== socketId);
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
    };

    setUserName = (user: IUser) => {
        const onlineUser = this.users.find(ouser => ouser.socketId === user.socketId);
        if (onlineUser) {
            onlineUser.userName = user.userName;
        };
        console.log(this.users);
    };

    reset = () => {
        this.users = [];
        console.log("ServerData.connection.reset");
    }

};

