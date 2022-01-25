import { APIResponse, FireBaseResponse, User } from '@/types';
import { AxiosResponse } from 'axios';
import instance from './instance';

const createSocket = async () => {
    return await instance.get("/api/create-socket")
};

const login = async (user: User) : Promise<APIResponse> => {

    const result = await instance.post("/api/login", user);

    if (result.status === 200) {
        return ({
            data: result.data
        })
    };

    if (result.status === 401) {
        return ({
            error: "User with this userName is Online"
        })
    };

    if (result.status === 500) {
        return ({
            error: "Unknow Error"
        })
    }

    return ({
        data: result.data
    })

};

const service = {
    createSocket,
    login
};

export default service;