import { IState } from "@/store/types";
import { getUserTeam } from "@/utils/user.ingame";
import { useSelector } from "react-redux";
import styled from "styled-components";
import UserPanelCards from "./UserPanelCards";

const UserPanelWrapper = styled.div`
    display: flex;
    height: 100%;
    padding: 0px 20px;
`

const UserPanel = () => {

    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);

    const team = getUserTeam(gameMembers, currentUser);

    return (
        <UserPanelWrapper>
            {team && <UserPanelCards team={team} />}
        </UserPanelWrapper>
    )

};

export default UserPanel;