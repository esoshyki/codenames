import { useEffect } from 'react';
import type { NextPage } from 'next'
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import { useDispatch } from 'react-redux';
import { connect } from 'socket.io-client';
import { setConnectionStatus } from '@/store/app/app.actions';
import { setUsersOnline } from '@/store/user/users.actions';

const Home: NextPage = () => {

  const dispatch = useDispatch();

  const connectSocket = () => {

    const socket = connect((process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"), {
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      dispatch(setConnectionStatus(true))
    });

    socket.on("update-online-users", (users) => {
      dispatch(setUsersOnline(users))
    })

    socket.on("disconnect", () => {
      dispatch(setConnectionStatus(false))
    });

  }

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <Layout>
      <Menu />
      {/* <ReadyUsers users={readyUsers} /> */}
    </Layout>
  )
}

export default Home
