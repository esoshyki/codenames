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
    const { users } = useSelector((state: IState) => state.user);

    const onIconClick = () => {
        hidden ? dispatch(showChat()) : dispatch((hideChat()));
    };

    return (
        <Fragment>
            <div className={classes.chat__icon} onClick={onIconClick}/>
            <div className={(hidden ? classes.chat__hidden : classes.chat__visible)}>
                <Messages messages={messages}/>

                <UsersOnline users={users} />
            </div>
        </Fragment>
    )
};

export default Chat;