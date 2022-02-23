import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { showChat, hideChat } from "../../store/chat/chat.actions";
import Messages from "./Messages";
import styled, { keyframes } from "styled-components";
import { colors } from "@/theme/colors";
import { select } from "@/store/select";

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
    bottom: 100px;
    right: 20px;
    width: 45px;
    height: 45px;
    background-image: url(/icons/chat.png);
    background-size: cover;
    z-index: 50001;
    &:hover {
        cursor: pointer;
        animation: ${roll} 0.5s linear 0s infinite;
    }
`;

const ChatWrapper = styled.div<{
    hidden: boolean
}>`
    right: ${props => props.hidden ? "-300px" : "0px"};
    position: fixed;
    width: 300px;
    height: 500px;
    bottom: 100px;
    transition: 0.3s ease-in;
    z-index: 50000;
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

    const chatIsHidden = useSelector(select.chat.chatIsHidden);
    const currentUser = useSelector(select.connection.currentUser);

    const onIconClick = () => {
        chatIsHidden ? dispatch(showChat()) : dispatch(hideChat());
    }; 

    return (
        <Fragment>
            <ChatIcon onClick={onIconClick} />
            <ChatWrapper hidden={chatIsHidden}>
                <ChatConnectedIcon connected={!!currentUser.socketId}/>
                <Messages />
            </ChatWrapper>
        </Fragment>
    );
};

export default Chat;
