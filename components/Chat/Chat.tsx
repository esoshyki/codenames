import classes from './Chat.module.sass';
import { useSelector, useDispatch } from 'react-redux';
import { IState, IChatMessage } from '../../store/types';
import { Fragment, useEffect } from 'react';
import { showChat, hideChat } from '../../store/chat/chat.actions';
import Messages from './Messages';
import UsersOnline from './UsersOnline';
import { connect } from "socket.io-client";
import {
    changeConnectionStatus,
    addUserToChat,
    removeUserFromChat,
    addChatMessage
} from '../../store/chat/chat.actions';

const Chat = () => {

    const dispatch = useDispatch();

    const { hidden, messages, users, connected } = useSelector((state: IState) => state.chat);
    const { user } = useSelector((state: IState) => state.user);

    const _connect = () => {

        const socket = connect((process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"), {
            path: "/api/socketio",
          });
     
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            dispatch(changeConnectionStatus(true))
            if (user) {
                dispatch(addUserToChat(user));
            }
        });

        socket.on("disconnect", () => {
            console.log("SOCKET_DISCONNECTED!");
            dispatch(changeConnectionStatus(false));
        })

        socket.on("message", (message: IChatMessage) => {
            console.log(message);
            dispatch(addChatMessage(message))
        });

    }

    useEffect(() => {

        if (!user) return () => { };

        _connect()

    }, [user])

    const onIconClick = () => {
        hidden ? dispatch(showChat()) : dispatch((hideChat()));
    };

    return (
        <Fragment>
            <div className={classes.chat__icon} onClick={onIconClick} />
            <div className={(hidden ? classes.chat__hidden : classes.chat__visible)}>
                <div className={connected ? classes.chat__connected : classes.chat__disconnected} />
                <Messages messages={messages} />

                <UsersOnline users={users} />
            </div>
        </Fragment>
    )
};

export default Chat;