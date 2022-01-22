import app from '.';
import { getDatabase, ref, set, child, get, remove } from "firebase/database";
import { IUser } from 'store/types';

const database = getDatabase(app);

const addOnlineUser = async (user: IUser) => {

    await set(ref(database, "codenames/online/" + user.userName), user);

    return user;
};

const removeUserFromOnline = async (user: IUser) => {

    await remove(ref(database, "codenames/online/" + user.userName));

    return user;
}

const getOnlineUsers = async () => {

    const snapshot = await get(ref(database, "codenames/online"));

    if (snapshot.val()) {
        return snapshot.val()
    };

    return [];
}

export const databaseService = {
    addOnlineUser,
    getOnlineUsers,
    removeUserFromOnline

}