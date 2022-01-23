import { IState } from '../../../store/types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const UsersOnlineWrapper = styled.div`
    
    display: flex;
    width: 100%;
    height: 50%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-weight: 700;
    color: #fff;

    & > h5 {
        margin: 5px 0;
        text-align: end;
    }
`;

const UserWrapper = styled.div`
    width: 100%;
    text-align: end;
    padding: 0 20px;
`

const UsersOnline = () => {

    const usersOnline = useSelector((state: IState) => state.user.usersOnline);

    const users = usersOnline ? Object.values(usersOnline) : [];

    return (
        <UsersOnlineWrapper>
            <h5>Users online</h5>

            {users && users.map((user) => (
                <UserWrapper key={`user-${user.userName}`}>
                    {user.userName}
                </UserWrapper>
            ))}
        </UsersOnlineWrapper>
    )
};

export default UsersOnline;