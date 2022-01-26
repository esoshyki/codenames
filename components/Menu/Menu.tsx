import classes from "./Menu.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/types";
import Login from "../Login";
import {
    hideLoginComponent,
    showLoginComponent
} from "@/store/app/app.actions";
import { logoutRequest } from "@/store/users/users.actions";

const Menu = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector((state: IState) => state.users.currentUser);

    const { showLogin } = useSelector((state: IState) => state.app);

    const toogleLogin = () => {
        dispatch(showLogin ? hideLoginComponent() : showLoginComponent());
    };

    const logout = () => {
        if (currentUser) {
            dispatch(logoutRequest(currentUser.userName));
        }
    };

    return (
        <nav className={classes.menu}>
            {!currentUser && (
                <span
                    onClick={toogleLogin}
                    className={["menu__item", classes.menu__link].join(" ")}
                >
                    {showLogin ? "Back" : "Login"}
                </span>
            )}

            {showLogin && <Login />}

            {currentUser && (
                <span
                    className={["menu__item", classes.menu__link].join(" ")}
                    onClick={logout}
                >
                    Logout
                </span>
            )}

        </nav>
    );
};

export default Menu;
