import { IUser } from '../store/types';
import API from './instance';

const userReady = async (user: IUser) => {
    const result = await API.post("/api/game/ready", user);

    if (result.data) {
        return result.data
    };
};

const userUnready = async (user: IUser) => {
    const result = await API.post("/api/game/unready", user);

    if (result.data) {
        return result.data
    };
};

const connect = async (user: IUser) => {
    const result = await API.post("/api/connect", user);
    return result.data
};

const disconnect = async (user: IUser) => {
    const result = await API.post("/api/disconnect", user);
    return result.data
};

const updateOnlineUsers = async () => {
    console.log("update online users");
    const result = await API.get("/api/users-online");
    return result.data;
}

const service = {
    userReady,
    userUnready,
    connect,
    disconnect,
    updateOnlineUsers
};

export default service;