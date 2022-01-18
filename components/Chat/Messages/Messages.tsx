import { IChatMessage } from "../../../store/types";
import AddMessage from "../AddMessage";
import classes from './Messages.module.sass';
import { useEffect, useRef } from 'react';

interface MessagesProps {
    messages: IChatMessage[]
}

const Messages = ({ messages }: MessagesProps) => {

    const listRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!listRef.current || !containerRef.current) return;

        const height = containerRef.current.offsetHeight - listRef.current.offsetHeight;

        console.log(height);

        containerRef.current.style.top = `-${height}px`;

    }, [messages])

    return (
        <div className={classes.messages} >

            <div className={classes.messages__list} ref={listRef}>
                <div className={classes.messages__container} ref={containerRef}>
                    {messages && messages.map((message) => (
                        <div key={`message-${message.user.userName}-${message.id}`} className={classes.messages__message}>
                            <div className={classes.messages__message__header}>
                                {message.user.userName}
                            </div>

                            <div className={classes.messages__message__body}>
                                {message.message}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddMessage />

        </div>
    )
};

export default Messages;