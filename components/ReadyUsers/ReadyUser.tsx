import { IUser } from '../../store/types';
import styled from 'styled-components';

interface ReadyUserProps {
    user: IUser;
};

const Root = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
    margin: 20px
`

const ReadyUser = ({ user } : ReadyUserProps) => {

    return (
        <Root>
            {user.userName}
        </Root>
    );


}

export default ReadyUser;