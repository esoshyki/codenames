import app from '.';
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { IUser, IFBUserData } from 'store/types';

const database = getDatabase(app);

const addOnlineUser = async (user: IFBUserData) : Promise<IUser> => {

    console.log(user);
    await set(
        ref(database, "codenames/online/" + user.socketId), user );

    return user;
};

const removeUserFromOnline = async (socketId: string) => {

    await remove(ref(database, "codenames/online/" + socketId));

    return socketId;
}

const getOnlineUsers = async () => {

    const snapshot = await get(ref(database, "codenames/online"));

    if (snapshot.val()) {
        return snapshot.val()
    };

    return [];
};

const removeOnlineUserBySocketId = async (socketId: string) => {
    console.log("HERE");

    console.log(socketId);
    const result = await remove(ref(database, "codenames/online/" + socketId));
    return result
}

export const databaseService = {
    addOnlineUser,
    getOnlineUsers,
    removeUserFromOnline,
    removeOnlineUserBySocketId
};