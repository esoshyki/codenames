import classes from './Chat.module.sass';
import { useSelector, useDispatch } from 'react-redux';
import { IState, IChatMessage, IUser } from '../../store/types';
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
import axios from 'axios';

const Chat = () => {

    const dispatch = useDispatch();

    const { hidden, messages, users, connected } = useSelector((state: IState) => state.chat);
    const { user } = useSelector((state: IState) => state.user);

    const enterToChat = async () => {
        const result = await axios.post("/api/chat/enter", user, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    const leaveChat = async () => {
        const result = await axios.post("/api/chat/leave", user, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    };

    const _connect = () => {

        const socket = connect((process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"), {
            path: "/api/socketio",
          });
     
        socket.on("connect", () => {
            console.log("SOCKET CONNECTED!", socket.id);
            dispatch(changeConnectionStatus(true))
        });

        socket.on("disconnect", () => {
            console.log("SOCKET_DISCONNECTED!");
            dispatch(changeConnectionStatus(false));
        })

        socket.on("message", (message: IChatMessage) => {
            dispatch(addChatMessage(message));
        });

        socket.on("adduser", (user : IUser) => {
            dispatch(addUserToChat(user))
        });

        socket.on("leavechat", (user: IUser) => {
            dispatch(removeUserFromChat(user));
        })

        enterToChat();

    };

    useEffect(() => {

        if (user) {
            _connect();
        } else {
            leaveChat();
        }

        return () => {
            leaveChat()
        }

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