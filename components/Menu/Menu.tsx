import classes from './Menu.module.sass';
import Link from 'next/link';

const Menu = () => {

    return (
        <nav className={classes.menu}>

            <Link href={"/Login"}>
                <a className={classes.menu__link}>Login</a>
            </Link>

            <Link href={"/Settings"}>
                <a className={classes.menu__link}>Settings</a>
            </Link>

        </nav>
    )
};

export default Menu;
