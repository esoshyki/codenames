import classes from './Menu.module.sass';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IState, IUser } from '../../store/types';
import { logout } from '../../store/user/user.actions';
import { setReady } from '../../store/game/game.actions';

const Menu = () => {

    const dispatch = useDispatch();

    const user = useSelector((state: IState) => state.user.user);
    const { ready } = useSelector((state: IState) => state.game);

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

            {!user && <Link href={"/login"}>
                <a className={classes.menu__link}>Login</a>
            </Link>}

            <Link href={"/Settings"}>
                <a className={classes.menu__link}>Settings</a>
            </Link>

            {user && (
                <a 
                    className={classes.menu__link}
                    onClick={() => dispatch(logout(user))}
                >
                    Logout
                </a>
            )}

        </nav>
    )
};

export default Menu;
