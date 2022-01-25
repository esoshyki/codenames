import app from '.';
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { ServerData, FireBaseResponse, User } from '@/types';
import { refs } from './refs';

const database = getDatabase(app);

const updateServerData = async () : Promise<FireBaseResponse> => {

    try {

        const snapshot = await get(ref(database, "/codenames/serverData"));

        if (snapshot.exists()) {
            return ({
                result: snapshot.val()
            })
        } else {
            return ({
                result: null
            })
        }

    } catch (error: any) {
        return ({
            error: error.message || "Database error"
        })
    };
};

const getData = async (target: string) => {
    return get(ref(database, target));
}

const writeData = async (target: string, data: any) => {

    return await set(ref(database, target), data)

};

const removeData = async (target: string, key: string) => {

    return await remove(ref(database, target + key));

};

const removeOnlineUser = async (socketId: string) : Promise<FireBaseResponse> => {

    try {
        await removeData(refs.ONLINE_USERS, socketId);

        const snapshot = await getData(refs.ONLINE_USERS);

        if (snapshot.exists()) {
            const newOnlineUsers = Object.values(snapshot.val());

            return ({
                result: newOnlineUsers
            });
        };

        return ({
            result: []
        })

    } catch (err: any) {

        return ({
            error: err.message || "Firebase error"
        })
    }

};

const login = async (user: User) : Promise<FireBaseResponse> => {

    try {

        const snapshot = await get(ref(database, "/codenames/serverData/onlineUsers"));

        if (snapshot.exists()) {
            const onlineUsers: User[] = Object.values(snapshot.val());

            if (onlineUsers.find((el) => el.userName === user.userName)) {

                return ({
                    error: "User exists"
                })

            } else {

                await writeData("/codenames/serverData/onlineUsers/" + user.socketId, user);

                return ({
                    result: [...onlineUsers, user]
                })

            }
        }

        await writeData("/codenames/serverData/onlineUsers/" + user.socketId, user);

        return ({
            result: [user]
        })

    } catch (error: any) {
        return ({
            error: error.message || "Database error"
        })
    };
};




export const databaseService = {
    updateServerData,
    login,
    removeOnlineUser
};