import { useRef } from "react";

import { IMessage } from "@/types/chat";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addChatMessageRequest } from "@/store/chat/chat.actions";
import { colors } from "@/theme/colors";
import { select } from "@/store/select";

const AddMessageWrapper = styled.div`
    position: absolute;
    bottom: 20px ;
`;

const Input = styled.input`
    background-color: transparent;
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 2px solid ${colors.blue};
    color: #fff;
    padding: 5px 10px;
    margin-bottom: 10px;
    &:focus {
        outline: none;
    }
`

const AddMessage = () => {

    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const currentUser = useSelector(select.connection.currentUser);

    const sendMessage = async () => {
        if (!inputRef.current?.value || !currentUser.userName) {
            return;
        }
        const newMessage: IMessage = {
            message: inputRef.current.value,
            userName: currentUser.userName,
        };

        console.log("addChatMessage");

        dispatch(addChatMessageRequest(newMessage));
        inputRef.current.value = "";

    };

    return (
        <AddMessageWrapper >
            <Input
                ref={inputRef}
                placeholder="Write message..."
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}
            />

            <button onClick={sendMessage} className="button" type="button">
                Send
            </button>
        </AddMessageWrapper>
    );
};

export default AddMessage;
