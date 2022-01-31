import { useRef } from "react";
import { IState } from "../../../store/types";
import { ChatMessage } from "@/store/chat/chat.types";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { addMessageRequest } from "@/store/chat/chat.actions";

const AddMessageWrapper = styled.div`
    position: absolute;
    bottom: 20px ;
`;

const Input = styled.input`
    background-color: transparent;
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 2px solid gray;
    color: #fff;
    padding: 5px 10px;
    margin-bottom: 10px;
`

const AddMessage = () => {

    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const { currentUser } = useSelector((state: IState) => state.users);

    const sendMessage = async () => {
        if (!inputRef.current?.value || !currentUser) {
            return;
        }
        const newMessage: ChatMessage = {
            text: inputRef.current.value,
            author: currentUser,
        };

        dispatch(addMessageRequest(newMessage));
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
