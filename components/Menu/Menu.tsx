import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/types";
import Login from "../Login";
import MenuItem from "./MenuItem";
import styled from "styled-components";
import { getCurrentUser } from "@/store/app/app.selectors";
import MenuInputName from "./MenuInputName";

const MenuWrapper = styled.nav`
    position: fixed;
    z-index: 5000;
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

    const currentUser = useSelector(getCurrentUser);

    return (
        <MenuWrapper>

            {!currentUser && <MenuInputName />}

            {currentUser && <MenuItem>Начать игру</MenuItem>}

        </MenuWrapper>
    );
};

export default Menu;
