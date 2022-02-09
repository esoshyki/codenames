import { IUser } from "@/types/users";

export class Connection {
    private users: IUser[] = [];

    constructor() {}

    findUser = (user: IUser) => this.users.find(u => u.userName === user.userName);

    addUser = (user: IUser) => this.users.push(user);

    getAllUsers = () => this.users;

    getConnectedUsers = () => this.users.filter(user => user.socketId);

    getNamesUsers = () => this.users.filter(user => user.userName);

    setSocketId = (user: IUser) => {
        const connectedUser = this.findUser(user);
        if (connectedUser) {
            connectedUser.socketId = user.socketId
        } else {
            this.addUser(user);
        }
    }
};

