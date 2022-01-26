import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../store/types";
import { Fragment } from "react";
import { showChat, hideChat } from "../../store/chat/chat.actions";
import Messages from "./Messages";
import UsersOnline from "./UsersOnline";
import styled, { keyframes } from "styled-components";
import { colors } from "@/theme/colors";

const roll = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.95);
    }
    100% {
        transform: scale(1);   
    }
`;

const ChatIcon = styled.div`
    position: fixed;
    top: 10px;
    right: 20px;
    width: 45px;
    height: 45px;
    background-image: url(/icons/chat.png);
    background-size: cover;
    z-index: 7;
    &:hover {
        cursor: pointer;
        animation: ${roll} 0.5s linear 0s infinite;
    }
`;

const ChatWrapper = styled.div<{
    _hidden: boolean
}>`
    right: ${props => props._hidden ? "-300px" : "0px"};
    position: fixed;
    width: 300px;
    height: 100vh;
    top: 0;
    transition: 0.3s ease-in;
    z-index: 5;
`

const ChatConnectedIcon = styled.div<{
    connected: boolean
}>`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    position: absolute;
    left: 5px;
    top: 5px;
    z-index: 6;
    background-color: ${props => props.connected ? colors.green : colors.red};
`;


const Chat = () => {
    const dispatch = useDispatch();

    const { hidden } = useSelector((state: IState) => state.chat);
    const { socketId } = useSelector((state: IState) => state.app);

    const onIconClick = () => {
        hidden ? dispatch(showChat()) : dispatch(hideChat());
    };

    return (
        <Fragment>
            <ChatIcon onClick={onIconClick} />
            <ChatWrapper _hidden={hidden}>
                <ChatConnectedIcon connected={!!socketId}/>
                <Messages />
                <UsersOnline />
            </ChatWrapper>
        </Fragment>
    );
};

export default Chat;
