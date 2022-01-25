import classes from './Menu.module.sass';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store/types';
import Login from '../Login';
import { hideLoginComponent, showLoginComponent } from '@/store/app/app.actions';

const Menu = () => {

    const dispatch = useDispatch();

    const currentUser = useSelector((state: IState) => state.users.currentUser);

    const { showLogin } = useSelector((state: IState) => state.app);

    const toogleLogin = () => {
        dispatch(showLogin ? hideLoginComponent() : showLoginComponent());
    };

     return (
        <nav className={classes.menu}>
         
            {!currentUser && <span 
                onClick={toogleLogin}
                className={["menu__item", classes.menu__link].join(" ")}
                >
                {showLogin ? "Back" : "Login"}
            </span>}

            {showLogin && <Login />}

            <Link href={"/Settings"}>
                <a className={classes.menu__link}>Settings</a>
            </Link>

            {currentUser && (
                <a 
                    className={classes.menu__link}
                    // onClick={() => dispatch(userLogoutRequest({userName: user.userName, socketId}))}
                >
                    Logout
                </a>
            )}
{/* 
            {isReady() && members.length >= 4 && (
                <StartGameSpan 
                    active={Boolean(votedToStart.find((member) => member.userName === user?.userName))}
                    className={"menu__item"} onClick={setStartVote}>
                    Start!
                </StartGameSpan>
            )} */}

        </nav>
    )
};

export default Menu;
