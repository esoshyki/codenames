import classes from './ReadyUsers.module.sass';
import { IUser } from '../../store/types';

interface ReadyUserProps {
    user: IUser;
};

const ReadyUser = ({ user } : ReadyUserProps) => {

    return (
        <div className={classes.ready_user}>
            {user.userName}
        </div>
    );


}

export default ReadyUser;