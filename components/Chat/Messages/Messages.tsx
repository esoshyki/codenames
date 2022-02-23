import AddMessage from "../AddMessage";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessagesWrapper from "./MessagesWrapper";
import MessagesList from "./MessagesList";
import MessagesContainer from "./MessagesContainer";
import Message from './Message';
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";
import { select } from "@/store/select";

const Messages = () => {

    const messages = useSelector(select.chat.chatMessages);

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

                            <Message key={`message-${message.userName}-${idx}`}>

                                <MessageHeader>
                                    {message.userName}
                                </MessageHeader>

                                <MessageBody>
                                    {message.message}
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
