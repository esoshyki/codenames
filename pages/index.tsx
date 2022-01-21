import type { NextPage } from 'next'
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { IState, IUser, IChatMessage } from '../store/types';
import ReadyUsers from '../components/ReadyUsers';
import { useEffect } from 'react';
import axios from 'axios';
import { io, connect, } from "socket.io-client";
import {
  changeConnectionStatus,
  addUserToChat,
  removeUserFromChat,
  addChatMessage
} from '../store/chat/chat.actions';
import API from '../axios/service';
import { addReadyUser, removeReadyUser, setProcessing } from '../store/game/game.actions';
import { setOnlineUsers } from '@/store/user/user.actions';


const Home: NextPage = () => {

  const dispatch = useDispatch();

  const { user, disconnectedUser } = useSelector((state: IState) => state.user);
  const { ready, processing, readyUsers } = useSelector((state: IState) => state.game);

  const addUser = async (user: IUser) => {
    const result = await axios.post("/api/chat/enter", user, {

    });

    if (result.data) {
      console.log(result.data);
    }
  }

  const leaveChat = async (user: IUser) => {

    const result = await axios.post("/api/chat/disconnect", user, {

    });

    if (result.data) {
      console.log(result.data);
    }
  };

  const socketWorker = () => {

    console.log("socketWorker");

    const socket = connect((process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"), {
      path: "/api/socketio",
    });

    socket.on("connect", () => {
      dispatch(changeConnectionStatus(true));
    });

    socket.on("disconnect_user", (user) => {
      console.log("user")
      dispatch(removeUserFromChat(user))
    });

    socket.on("disconnect", () => {
      dispatch(changeConnectionStatus(false));
    });

    socket.on("ping", (count) => {
      console.log("ping", count);
    })

    socket.on("message", (message: IChatMessage) => {
      dispatch(addChatMessage(message));
    });

    socket.on("adduser", (user: IUser) => {
      dispatch(addUserToChat(user))
    });

    socket.on("leavechat", (user: IUser) => {
      dispatch(removeUserFromChat(user));
    });

    socket.on("user_ready", (user: IUser) => {
      dispatch(addReadyUser(user));
    });

    socket.on("user_unready", (user: IUser) => {
      dispatch(removeReadyUser(user));
    });

    socket.on("change_online_users", (users: IUser[]) => {
      console.log("users", users);
      dispatch(setOnlineUsers(users));
    })

  };

  useEffect(() => {
    if (!user) {
        socketWorker()
    };
  }, []);

  useEffect(() => {
      if (user) {
          addUser(user)
      }
  }, [user])

  useEffect(() => {

    if (disconnectedUser) {
      leaveChat(disconnectedUser)
    };

  }, [disconnectedUser]);

  useEffect(() => {
    if (typeof ready !== "boolean") return;
    if (!user || processing) return;
    dispatch(setProcessing(true))
    if (ready) {
      API.userReady(user);
    } else {
      API.userUnready(user);
    }
    dispatch(setProcessing(false))
  }, [ready])


  return (
    <Layout>
      <Menu />
      <ReadyUsers users={readyUsers} />
    </Layout>
  )
}

export default Home
