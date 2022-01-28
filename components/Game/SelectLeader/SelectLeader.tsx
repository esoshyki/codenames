import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/store/types";
import { getCurrentMember } from "@/utils/user.ingame";
import { getTeamates } from "@/utils/user.ingame";

const SelectLeaderWrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const SelectLeaderItems = styled.div`

`;


const TeamMembers = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);

    const teamates = getTeamates(gameMembers, currentUser);

    return (
        <SelectLeaderWrapper>
            <h5>Select a leader of your team</h5>
        </SelectLeaderWrapper>
    )
};

export default TeamMembers;