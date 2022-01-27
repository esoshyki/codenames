import { InGameUser } from "@/store/game/game.types";
import { colors } from "@/theme/colors";
import styled from "styled-components";

const Wrapper = styled.div<{
    ready: boolean
}>`
    width: 200px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 15px;
    font-size: 14px;
    color: ${colors.blue};
    background-color: ${props => props.ready ? colors.green : "#fff"};
    margin: 10px;
`;

interface Props {
    user: InGameUser
}

const PreStartGameMember = ({user} : Props) => {

    return (
        <Wrapper ready={user.ready}>
            {user.userName}
        </Wrapper>
    )
};

export default PreStartGameMember;