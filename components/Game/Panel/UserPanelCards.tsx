import { Sides } from "@/store/game/game.types";
import styled from "styled-components";

interface UserPanelCardsProps {
    team: Sides;
};

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const Card = styled.div<{
    team: Sides
}>`
    width: 100px;
    height: 70px;
    margin: 10px;
    border-radius: 10px;
    background-image: ${props => props.team === Sides.blue ? "url(/images/blue_card.jpg)" : "url(/images/red_card.jpg)"};
    background-size: cover;
`

const UserPanelCards = ({ team } : UserPanelCardsProps) => {

    return (
        <Wrapper>
            <Card team={team} />
        </Wrapper>
    )
};

export default UserPanelCards;