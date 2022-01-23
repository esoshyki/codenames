import classes from './Menu.module.sass';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store/types';
import { setReady } from '../../store/game/game.actions';
import { setShowLogin } from '@/store/app/app.actions';
import { userLogoutRequest } from '@/store/user/users.actions';
import Login from '../Login';

const Menu = () => {

    const dispatch = useDispatch();

    const user = useSelector((state: IState) => state.user.user);
    const { ready } = useSelector((state: IState) => state.game);
    const { showLogin, socketId } = useSelector((state: IState) => state.app);

    const toogleLogin = () => {
        dispatch(setShowLogin(!showLogin));
    };

    return (
        <nav className={classes.menu}>

            {user && !ready && (
                <span
                    onClick={() => dispatch(setReady(true))} 
                    className={["menu__item", classes.menu__link].join(" ")}>
                    Ready
                </span>)}

            {user && ready && (
                <span
                    onClick={() => dispatch(setReady(false))}  
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

        </nav>
    )
};

export default Menu;
