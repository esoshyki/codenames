import { IUser } from "@/types/users";

export class Connection {
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
        console.log(`this.users before disconnected`, this.users)
        const user = this.users.find(user => user.socketId === socketId);
        if (user) {
            if (!user.userName) {
                this.removeUserBySocketId(socketId)
            } else {
                user.socketId = undefined;
            }
        };
        console.log(`this.users after disconnected`, this.users)
    };

    setUserName = (user: IUser) => {
        const onlineUser = this.users.find(ouser => ouser.socketId === user.socketId);
        console.log(onlineUser);
        if (onlineUser) {
            onlineUser.userName = user.userName;
        };
        console.log(this.users);
    };


};

