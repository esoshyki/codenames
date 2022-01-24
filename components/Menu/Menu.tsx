import classes from './Menu.module.sass';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store/types';
import { setReadyRequest, setUnreadyRequest } from '../../store/game/game.actions';
import { setShowLogin, showGame } from '@/store/app/app.actions';
import { userLogoutRequest } from '@/store/user/users.actions';
import Login from '../Login';
import API from '@/api/service';
import { useEffect } from 'react';

const StartGameSpan = styled.span<{active: boolean}>`
    font-size: 40px;
    margin-top: 20px;
    font-weight: 700;
    color: ${props => props.active ? "green" : "#fff"};
    &:hover {
        color: #fffb1e
    }
`

const Menu = () => {

    const dispatch = useDispatch();

    const user = useSelector((state: IState) => state.user.user);
    const { members, votedToStart } = useSelector((state: IState) => state.game);
    const { showLogin, socketId } = useSelector((state: IState) => state.app);

    const toogleLogin = () => {
        dispatch(setShowLogin(!showLogin));
    };

    const onReady = () => {
        if (user && socketId) {
            dispatch(setReadyRequest({
                userName: user.userName,
                socketId
            }))
        };
    };

    const onUnready = () => {
        if (user && socketId) {
            dispatch(setUnreadyRequest({
                userName: user.userName,
                socketId
            }))
        };
    };

    const isReady = () => {
        if (!user) {
            return false
        };

        return members.find((member) => member.userName === user.userName )
    };

    useEffect(() => {
        if (votedToStart.length > 0 && votedToStart.length === members.length) {
            dispatch(showGame())
        }
    }, [votedToStart])

    const setStartVote = () => {
        if (!user || ! socketId) {
            return;
        }

        console.log("here");

        API.sendStartVoteRequest({
            userName: user.userName,
            socketId
        })
    }

     return (
        <nav className={classes.menu}>

            {user && !isReady() && (
                <span
                    onClick={onReady} 
                    className={["menu__item", classes.menu__link].join(" ")}>
                    Ready
                </span>)}

            {user && isReady() && (
                <span
                    onClick={onUnready}  
                    className={["menu__item", classes.menu__link].join(" ")}>
                    Not ready
                </span>)}

           
            {!user && <span 
                onClick={toogleLogin}
                className={["menu__item", classes.menu__link].join(" ")}
                >
                {showLogin ? "Back" : "Login"}
            </span>}

            {showLogin && <Login />}

            <Link href={"/Settings"}>
                <a className={classes.menu__link}>Settings</a>
            </Link>

            {user && socketId &&  (
                <a 
                    className={classes.menu__link}
                    onClick={() => dispatch(userLogoutRequest({userName: user.userName, socketId}))}
                >
                    Logout
                </a>
            )}

            {isReady() && members.length >= 4 && (
                <StartGameSpan 
                    active={Boolean(votedToStart.find((member) => member.userName === user?.userName))}
                    className={"menu__item"} onClick={setStartVote}>
                    Start!
                </StartGameSpan>
            )}

        </nav>
    )
};

export default Menu;
