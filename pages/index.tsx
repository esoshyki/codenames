import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next'
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import Game from '@/components/Game';
import ReadyUsers from '@/components/ReadyUsers';
import { IState } from '@/store/types';
import { socket } from 'socket/socket';
import { SocketActions } from '@/types/socket.actions';
import { updateOnlineUsers, updateOnlineUsersRequest } from '@/store/server/server.actions';
import { ServerData, User } from '@/types';
import { setSockedId } from '@/store/app/app.actions';


const Home: NextPage = () => {

  	const dispatch = useDispatch();

	const showGame = useSelector((state: IState) => state.app.showGame);

	const connectSocket = () => {

		socket.on("connect", () => {
			dispatch(setSockedId(socket.id));
			dispatch(updateOnlineUsersRequest())
		});
	

		socket.on(SocketActions.CHANGE_ONLINE_USERS, (users: User[]) => {
			console.log(users);
			dispatch(updateOnlineUsersRequest());
		});
	
	
	};

	useEffect(() => {
		connectSocket();

	}, [])

  	return (
    	<Layout>
      		{!showGame && <Menu />}
			{showGame && <Game />}
      		{!showGame && <ReadyUsers />}
    	</Layout>
  	)
};

export default Home;
