import { IUser } from '../../store/types';
import ReadyUser from './ReadyUser';
import { Fragment } from 'react';
import styled from 'styled-components';

interface ReadyUsersProps {
    users: IUser[];
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UsersWrappers = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const ReadyUsers = ({ users }: ReadyUsersProps) => {

    return (

        <Wrapper >
            <h5>Ready users</h5>

            <UsersWrappers>
                {users && users.map((user, idx) => (
                    <Fragment key={idx}>
                        <ReadyUser user={user} />
                    </Fragment>
                )
                )}
            </UsersWrappers>

        </Wrapper>)
};

export default ReadyUsers