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
    const result = await remove(ref(database, "codenames/online/" + socketId));
    return result
};

const addGameMember = async (user: IFBUserData) => {
    await set(
        ref(database, "codenames/game/members/" + user.socketId), user );
};

const removeGameMember = async (socketId: string) => {
    return await remove(ref(database, "codenames/game/members/" + socketId))
};

const getGameMembers = async () : Promise<IFBUserData[]> => {
    const snapshot = await get(ref(database, "codenames/game/members/"));

    if (snapshot.exists()) {
        return Object.values(snapshot.val());
    };

    return [];
};

const addVotedToStartMember = async (user: IFBUserData) => {
    const snapshot = await get(ref(database, "codenames/game/votedTostart/" + user.socketId));

    if (snapshot.exists()) {
        return remove(ref(database, "codenames/game/votedTostart/" + user.socketId))
    } else {
        return await set(ref(database, "codenames/game/votedTostart/" + user.socketId), user)
    }
};

const removeVotedToStartMember = async (socketId: string) => {
    return await remove(ref(database, "codenames/game/votedTostart/" + socketId))
};

const getVotedToStartMembers = async () : Promise<IFBUserData[]> => {
    const snapshot = await get(ref(database, "codenames/game/votedTostart/"));

    if (snapshot.exists()) {
        return Object.values(snapshot.val());
    };

    return [];
};

const destroyAllData = async () => {
    remove(ref(database, "codenames/"))
}


export const databaseService = {
    addOnlineUser,
    getOnlineUsers,
    removeUserFromOnline,
    removeOnlineUserBySocketId,
    addGameMember,
    removeGameMember,
    getGameMembers,
    addVotedToStartMember,
    removeVotedToStartMember,
    getVotedToStartMembers,
    destroyAllData
};