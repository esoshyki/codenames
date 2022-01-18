import { IChatMessage } from "../../../store/types";
import AddMessage from "../AddMessage";
import classes from './Messages.module.sass';

interface MessagesProps {
    messages: IChatMessage[]
}

const Messages = ({ messages }: MessagesProps) => {

    return (
        <div className={classes.messages}>

            <div className={classes.messages__list}>
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

            <AddMessage />

        </div>
    )
};

export default Messages;