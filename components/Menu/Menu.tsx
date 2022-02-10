import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import MenuItem from "./MenuItem";
import styled from "styled-components";
import { select } from '@/store/select';

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

    const currentUser = useSelector(select.connection.currentUser);
   
    return (
        <MenuWrapper>

            {!currentUser.userName && <Login />}

            {currentUser.userName && <MenuItem>Начать игру</MenuItem>}

        </MenuWrapper>
    );
};

export default Menu;
