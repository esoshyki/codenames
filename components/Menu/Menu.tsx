import classes from './Menu.module.sass';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store/types';
import { deleteUser } from '../../store/user/user.actions';

const Menu = () => {

    const dispatch = useDispatch();

    const user = useSelector((state: IState) => state.user.user);

    console.log(user);

    return (
        <nav className={classes.menu}>

            {user && <Link href={"/create"}>
                <a className={classes.menu__link}>Create game</a>
            </Link>}

            {user && <Link href={"/join"}>
                <a className={classes.menu__link}>Join game</a>
            </Link>}

            {!user && <Link href={"/login"}>
                <a className={classes.menu__link}>Login</a>
            </Link>}

            <Link href={"/Settings"}>
                <a className={classes.menu__link}>Settings</a>
            </Link>

            {user && (
                <a 
                    className={classes.menu__link}
                    onClick={() => dispatch(deleteUser(user.id))}
                >
                    Logout
                </a>
            )}

        </nav>
    )
};

export default Menu;
