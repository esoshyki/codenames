import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import connectSocket from 'socket';
import type { NextPage } from 'next'
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import Game from '@/components/Game';
import ReadyUsers from '@/components/ReadyUsers';

import { IState } from '@/store/types';

const Home: NextPage = () => {

  	const dispatch = useDispatch();

	const user = useSelector((state: IState) => state.user.user);
	const showGame = useSelector((state: IState) => state.app.showGame);

	useEffect(() => {
		const socket = connectSocket(dispatch);

		return () => {
			if (user) {
				socket.emit("user_leaving", user);				
			}
		};
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
