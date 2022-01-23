import { useEffect } from 'react';
import type { NextPage } from 'next'
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { connectSocket } from 'socket';
import { IState } from '@/store/types';

const Home: NextPage = () => {

  	const dispatch = useDispatch();

	const user = useSelector((state: IState) => state.user.user);

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
      		<Menu />
      		{/* <ReadyUsers users={readyUsers} /> */}
    	</Layout>
  	)
};

export default Home;
