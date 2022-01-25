import { connect } from 'socket.io-client';
import { AnyAction, Dispatch } from 'redux';
import { setSockedId } from '@/store/user/users.actions';
import { SocketActions } from '@/types/socket.actions';
import { updateOnlineUsers } from '@/store/server/server.actions';
import { User } from '@/types';

const connectSocket = (dispatch: Dispatch<AnyAction>) => {

    const socket = connect((process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"), {
        path: "/api/socket",
    });

    socket.on("connect", () => {
        console.log("connect");
        dispatch(setSockedId(socket.id));
    });

    socket.on("user_disconnected", (users: User[]) => {
        dispatch(updateOnlineUsers(users))
    });

    socket.on(SocketActions.CHANGE_ONLINE_USERS, (users: User[]) => {
        dispatch(updateOnlineUsers(users));
    })

    return socket;

};

export default connectSocket;