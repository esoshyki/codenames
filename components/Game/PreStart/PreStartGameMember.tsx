import { InGameUser, Sides } from "@/store/game/game.types";
import { IState } from "@/store/types";
import { colors } from "@/theme/colors";
import { getUserTeam } from "@/utils/user.ingame";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div<{
    ready: boolean,
    team: Sides | null
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
    border: 4px solid ${colors.yellow};
    margin: 10px;
`;

interface Props {
    user: InGameUser
}

const PreStartGameMember = ({user} : Props) => {

    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);

    const team = getUserTeam(gameMembers, currentUser);

    return (
        <Wrapper ready={user.ready} team={team}>
            {user.userName}
        </Wrapper>
    )
};

export default PreStartGameMember;