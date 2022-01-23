import { connect } from 'socket.io-client';
import { setSocketId } from '@/store/app/app.actions';
import { setUsersOnline } from '@/store/user/users.actions';
import { AnyAction, Dispatch } from 'redux';
import { SocketActions } from './types';
import { IUser } from '@/store/types';
import { 
  	updateOnlineUsersRequest,
  	showUserConnectedAd,
  	showUserDisconnectedAd
} from '@/store/app/app.actions';

export const connectSocket = (dispatch : Dispatch<AnyAction>) => {

    const socket = connect((process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"), {
      path: "/api/socketio",
    });


    socket.on(SocketActions.connect, () => {
      dispatch(setSocketId(socket.id))
    });

    socket.on(SocketActions.user_connected, (user: IUser) => {
		    dispatch(showUserConnectedAd(user))
        dispatch(updateOnlineUsersRequest());
    });

    socket.on(SocketActions.user_disconnected, (user) => {
		    dispatch(showUserDisconnectedAd(user));
        dispatch(updateOnlineUsersRequest());
    });

    socket.on("userDisconnected", () => {
      dispatch(updateOnlineUsersRequest());
    });

    socket.on(SocketActions.update_online_users, (users: IUser[]) => {
        dispatch(setUsersOnline(users));
    });

    socket.on(SocketActions.disconnect, () => {
      dispatch(setSocketId(null))
    });

    return socket;

}