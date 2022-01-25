import { connect } from 'socket.io-client';
import { AnyAction, Dispatch } from 'redux';
import { SocketActions } from '@/types/socket.actions';
import { updateOnlineUsers, updateServerData } from '@/store/server/server.actions';
import { ServerData, User } from '@/types';
import { setSockedId } from '@/store/app/app.actions';

const connectSocket = (dispatch: Dispatch<AnyAction>) => {

    const socket = connect((process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"), {
        path: "/api/socket",
    });

    socket.on("connect", () => {
        dispatch(setSockedId(socket.id));
    });

    socket.on("user_disconnected", (users: User[]) => {
        dispatch(updateOnlineUsers(users))
    });

    socket.on(SocketActions.CHANGE_ONLINE_USERS, (users: User[]) => {
        dispatch(updateOnlineUsers(users));
    });

    socket.on(SocketActions.UPDATE_SERVER_DATA, (newServerData: ServerData) => {
        console.log("newServerData", newServerData)
        dispatch(updateServerData(newServerData))
    });

    return socket;

};

export default connectSocket;