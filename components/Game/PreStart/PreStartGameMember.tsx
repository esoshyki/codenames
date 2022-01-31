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
    font-size: 16px;
    font-weight: 800;
    color: #000;
    background-color: ${props => props.ready ? colors.green : "#fff"};
    border: 5px solid ${colors.yellow};
    border-inline-start-color: ${colors.blue};
    border-inline-end-color: ${colors.blue};
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