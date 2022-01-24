import { IState, IUser } from '../../store/types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

interface ReadyUserProps {
    user: IUser;
};

const Root = styled.div<{active: boolean}>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
    margin: 20px;
    color: ${props => props.active ? "green" : "#fff"};
`

const ReadyUser = ({ user } : ReadyUserProps) => {

    const votedToStart = useSelector((state: IState) => state.game.votedToStart);

    return (
        <Root active={Boolean(votedToStart.find((member) => member.userName === user.userName))}>
            {user.userName}
        </Root>
    );


}

export default ReadyUser;