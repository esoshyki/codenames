import { Sides } from "@/types/game";
import { colors } from "@/theme/colors";
import { IUser } from "@/types/users";
import styled from "styled-components";

const Wrapper = styled.div<{
    ready?: true,
    team?: Sides
}>`
    width: 200px;
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 15px;
    font-size: 20px;
    font-weight: 900;
    color: ${colors.yellow};
    background-image: ${props => {
        switch (props.team) {
            case Sides.blue:
                return "url(/images/blue_card.jpg)";
            case Sides.red:
                return "url(/images/red_card.jpg)";
            default:
                return "url(/images/white_card.jpeg)";
        }
    }};
    background-size: cover;
    border: 4px solid ${props => props.ready ? colors.green : colors.yellow};
    margin: 10px;
`;

interface Props {
    user: IUser
}

const PreStartGameMember = ({user} : Props) => {

    return (
        <Wrapper ready={user.ready} team={user.team}>
            {user.userName}
        </Wrapper>
    )
};

export default PreStartGameMember;