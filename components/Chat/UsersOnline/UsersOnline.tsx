import classes from './UsersOnline.module.sass';
import { IUser } from '../../../store/types';

interface UsersOnlineProps {
    users: IUser[]
}

const UsersOnline = ({ users }: UsersOnlineProps) => {

    return (
        <div className={classes.users_online}>
            <h5>Users online</h5>

            {users && users.map((user) => (
                <div key={`user-${user.userName}`} className={classes.users_online__user}>
                    {user.userName}
                </div>
            ))}
        </div>
    )
};

export default UsersOnline;