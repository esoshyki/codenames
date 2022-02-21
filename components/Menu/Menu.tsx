import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import MenuItem from "./MenuItem";
import styled from "styled-components";
import { select } from '@/store/select';
import { startGameRequest } from "@/store/game/game.actions";
import t from '@/t';
import { getLocale } from "translate/locales";
import { useRouter } from "next/router";
import { MenuContent } from "translate/menu";

const MenuWrapper = styled.nav`
    position: fixed;
    z-index: 5000;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);

    *  {
        transition: 0.2s ease-in;
    }
`;

const Menu = () => {

    const dispatch = useDispatch();
    const locale = getLocale(useRouter().locale);

    const currentUser = useSelector(select.connection.currentUser);

    const startGame = () => {
        dispatch(startGameRequest())
    };
   
    return (
        <MenuWrapper>

            {!currentUser.userName && <Login />}

            {currentUser.userName && (
                <MenuItem onClick={startGame}>
                    {t.menu(locale, MenuContent.beginGame)}
                </MenuItem>
            )}

        </MenuWrapper>
    );
};

export default Menu;
