import AddMessage from "../AddMessage";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import MessagesWrapper from "./MessagesWrapper";
import MessagesList from "./MessagesList";
import MessagesContainer from "./MessagesContainer";
import Message from './Message';
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";

const Messages = () => {

    const messages = useSelector((state: IState) => state.chat.messages);

    const listRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        if (!listRef.current || !containerRef.current) return;

        const height =
            containerRef.current.offsetHeight - listRef.current.offsetHeight;

        containerRef.current.style.top = `-${height}px`;
    }, [messages]);

    return (
        <MessagesWrapper>
            <MessagesList ref={listRef}>
                <MessagesContainer ref={containerRef}>

                    {messages &&
                        messages.map((message, idx) => (

                            <Message key={`message-${message.author.userName}-${idx}`}>

                                <MessageHeader>
                                    {message.author.userName}
                                </MessageHeader>

                                <MessageBody>
                                    {message.text}
                                </MessageBody>

                            </Message>
                        )
                    )}

                </MessagesContainer>
            </MessagesList>

            <AddMessage />
        </MessagesWrapper>
    );
};

export default Messages;
