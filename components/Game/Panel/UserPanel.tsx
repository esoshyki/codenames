import { IState } from "@/store/types";
import { colors } from "@/theme/colors";
import { getUsersCards, getUserTeam, isLeader } from "@/utils/user.ingame";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CustomAction from "./PanelCustomAction";
import LeaderAction from "./PanelLeaderAction";
import UserPanelCards from "./UserPanelCards";

const UserPanelWrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 0px 20px;
`;

const UserPanelSpan = styled.span`
    font-size: 2rem;
    font-weight: 800;
    margin: auto 10px;
    color: ${colors.yellow};
`;

const UserPanel = () => {

    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const { gameMembers } = useSelector((state: IState) => state.game);
    const { fieldPicks, guesserData } = useSelector((state: IState) => state.game.gameData)

    const team = getUserTeam(gameMembers, currentUser);

    const getCardsCount = () => {
        if (!guesserData) return "";
        const side = getUserTeam(gameMembers, currentUser);
        if (!side) return "";
        const count = getUsersCards(fieldPicks, guesserData.data, side);
        return count;
    }

    return (
        <UserPanelWrapper>
            {team && <UserPanelCards team={team} />}
            <UserPanelSpan> x </UserPanelSpan>
            <UserPanelSpan>{getCardsCount()}</UserPanelSpan>
            {isLeader(gameMembers, currentUser) && <LeaderAction />}
            {!isLeader(gameMembers, currentUser) && <CustomAction />}
        </UserPanelWrapper>
    )

};

export default UserPanel;