import styled from "styled-components";
import PanelDescriptionSpan from "./PanelDescriptionSpan";
import UserPanelCards from "./UserPanelCards";
import { colors } from "@/theme/colors";
import { PanelProps } from "./Panel";
import { Sides } from "@/types/game";

const PaneylEnemyWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 30%;
    position: absolute;
    right: 20px;
    padding: 0px 20px;
    justify-self: flex-start;
`;


const UserPanelSpan = styled.span`
    font-size: 2rem;
    font-weight: 800;
    margin: auto 10px;
    color: ${colors.yellow};
`;


const PanelEnemy = ({ currentUser, field } : PanelProps) => {

    const team = currentUser.team === Sides.blue ? Sides.red : Sides.blue;

    const restCards = field.cards.filter(card => card.type === team && !card.covered).length

    return (
        <PaneylEnemyWrapper>
            <PanelDescriptionSpan>Противник</PanelDescriptionSpan>
            {team && <UserPanelCards team={team} />}
            <UserPanelSpan>X</UserPanelSpan>
            <UserPanelSpan>{restCards}</UserPanelSpan>
        </PaneylEnemyWrapper>
    )
};

export default PanelEnemy;