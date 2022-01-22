import { useEffect } from 'react';
import type { NextPage } from 'next'
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import { useDispatch } from 'react-redux';
import { connectSocket } from 'socket';


const Home: NextPage = () => {

  	const dispatch = useDispatch();

  	useEffect(() => {
    	connectSocket(dispatch);
  	}, []);

  	return (
    	<Layout>
      		<Menu />
      		{/* <ReadyUsers users={readyUsers} /> */}
    	</Layout>
  	)
};

export default Home;
