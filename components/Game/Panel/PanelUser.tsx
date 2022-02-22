import { colors } from "@/theme/colors";
import styled from "styled-components";
import { PanelProps } from "./Panel";
import LeaderAction from "./PanelLeaderAction";
import UserPanelCards from "./UserPanelCards";

const UserPanelWrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 0px 20px;
    width: 60%;
`;

const UserPanelSpan = styled.span`
    font-size: 2rem;
    font-weight: 800;
    margin: auto 10px;
    color: ${colors.yellow};
`;

const UserPanel = (props: PanelProps) => {

    const { currentUser } = props;
    const { team } = currentUser;

    const cardRest = props.field.cards.filter(card => card.type === team && !card.covered).length;


    return (
        <UserPanelWrapper>
            {team && <UserPanelCards team={team} />}
            <UserPanelSpan> x </UserPanelSpan>
            <UserPanelSpan>{cardRest}</UserPanelSpan>
            {currentUser.leader && <LeaderAction {...props}/>}
          </UserPanelWrapper>
    )

};

export default UserPanel;