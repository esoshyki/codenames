import classes from './Chat.module.sass';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../store/types';
import { Fragment } from 'react';
import { showChat, hideChat } from '../../store/chat/chat.actions';
import Messages from './Messages';
import UsersOnline from './UsersOnline';

const Chat = () => {

    const dispatch = useDispatch();

    const { hidden, messages } = useSelector((state: IState) => state.chat);
    const { socketId } = useSelector((state: IState) => state.app);
 
    const onIconClick = () => {
        hidden ? dispatch(showChat()) : dispatch((hideChat()));
    };

    return (
        <Fragment>
            <div className={classes.chat__icon} onClick={onIconClick} />
            <div className={(hidden ? classes.chat__hidden : classes.chat__visible)}>
                <div className={socketId ? classes.chat__connected : classes.chat__disconnected} />
                <Messages messages={messages} />

                <UsersOnline />
            </div>
        </Fragment>
    )
};

export default Chat;