import { APIResponse, FireBaseResponse, User } from '@/types';
import { AxiosResponse } from 'axios';
import instance from './instance';

const createSocket = async () => {
    return await instance.get("/api/create-socket")
};

const login = async (user: User) : Promise<APIResponse> => {

    try {
        await instance.post("/api/login", user);

        return ({
            data: user
        })
        
    } catch (error: any) {

        return ({
            error: error?.response?.data || "Server error"
        })
    }
 
};

const logout = async (user: User) : Promise<APIResponse> => {

    try {

        await instance.post("/api/logout", user);

        return ({
            data: true
        });

    }  catch (error: any) {

        return ({
            error: error?.response?.data || "Server error"
        })
    }
}

const updateUserData = async (user: User) => {
    instance.post("/api/update-user-data", user)
}

const service = {
    createSocket,
    login,
    logout,
    updateUserData
};

export default service;