import classes from './ReadyUsers.module.sass';
import { IUser } from '../../store/types';
import ReadyUser from './ReadyUser';
import { Fragment } from 'react';

interface ReadyUsersProps {
    users: IUser[];
}

const ReadyUsers = ({ users }: ReadyUsersProps) => {

    return (

        <div className={classes.ready_users}>
            <h5>Ready users</h5>

            {users && users.map((user, idx) => (
                <Fragment key={idx}>
                    <ReadyUser user={user} />
                </Fragment>
            )
            )}

        </div>)
};

export default ReadyUsers