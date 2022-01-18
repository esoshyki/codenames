import { IChatMessage } from "../../../store/types";
import classes from './Messages.module.sass';

interface MessagesProps {
    messages: IChatMessage[]
}

const Messages = ({ messages }: MessagesProps) => {

    return (
        <div className={classes.messages}>

            {messages && messages.map((message) => (
                <div key={`message${message.id}`} className={classes.messages__message}>
                    <div className={classes.messages__message__header}>
                        {message.user}
                    </div>

                    <div className={classes.messages__message__body}>
                        {message.message}
                    </div>
                </div>
            ))}

        </div>
    )
};

export default Messages;