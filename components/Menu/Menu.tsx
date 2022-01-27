import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/types";
import Login from "../Login";
import {
    hideLoginComponent,
    showLoginComponent
} from "@/store/app/app.actions";
import { logoutRequest } from "@/store/users/users.actions";
import MenuItem from "./MenuItem";
import styled from "styled-components";

const MenuWrapper = styled.nav`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    *  {
        transition: 0.2s ease-in;
    }
`;

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
        <MenuWrapper>
            {!currentUser && (
                <MenuItem  onClick={toogleLogin}>
                    {showLogin ? "Back" : "Login"}
                </MenuItem>
            )}

            {showLogin && <Login />}

            {currentUser && (
                <MenuItem className="menu__item" onClick={logout}>
                    Logout
                </MenuItem>
            )}

        </MenuWrapper>
    );
};

export default Menu;
