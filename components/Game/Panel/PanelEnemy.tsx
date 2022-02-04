import { IState } from "@/store/types";
import { getOppositeCardsRest, getOppositeTeam } from "@/utils/user.ingame";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PanelDescriptionSpan from "./PanelDescriptionSpan";
import UserPanelCards from "./UserPanelCards";
import { colors } from "@/theme/colors";

const PaneylEnemyWrapper = styled.div`
    display: flex;
    height: 100%;
    width: 40%;
    position: relative;
    padding: 0px 20px;
    justify-self: flex-end;
`;


const UserPanelSpan = styled.span`
    font-size: 2rem;
    font-weight: 800;
    margin: auto 10px;
    color: ${colors.yellow};
`;


const PanelEnemy = () => {

    const currentUser= useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);
    const { fieldPicks, guesserData } = useSelector((state: IState) => state.game.gameData);

    const team = getOppositeTeam(gameMembers, currentUser);

    const getCards = () => {
        if (guesserData?.data && team) {
            return getOppositeCardsRest(fieldPicks, guesserData.data, team);
        };

        return "";
    }

    return (
        <PaneylEnemyWrapper>
            <PanelDescriptionSpan>Противник</PanelDescriptionSpan>
            {team && <UserPanelCards team={team} />}
            <UserPanelSpan>X</UserPanelSpan>
            <UserPanelSpan>{getCards()}</UserPanelSpan>
        </PaneylEnemyWrapper>
    )
};

export default PanelEnemy;