import classes from './AddMessage.module.sass';
import { useRef } from 'react';
import { IChatMessage, IState } from '../../../store/types';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddMessage = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const { currentUser } = useSelector((state: IState) => state.users);
    const { messages } = useSelector((state: IState) => state.chat)

    const sendMessage = async () => {
        if (!inputRef.current?.value || !currentUser) {
            return;
        }
        const newMessage: IChatMessage = {
            message: inputRef.current.value,
            user: currentUser,
            id: messages.length
        };

        const response = await axios.post("/api/chat/addmessage", newMessage, {
            headers: {
                "Content-Type" : "application/json"
            }
        });

        if (response.status === 201) {
            inputRef.current.value = "";
        };
    };

    return (
        <div className={classes.add_message}>
            <input
                className='input'
                ref={inputRef}
                placeholder='Write message...'
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        sendMessage()
                    }
                }}
            />

            <button
                onClick={sendMessage}
                className='button'
                type='button'>
                Send
            </button>

        </div>
    )
};

export default AddMessage
