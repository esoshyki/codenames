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



const service = {
    userReady,
    userUnready
};

export default service;