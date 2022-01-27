import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "@/store/types";
import { setTeamRequest } from "@/store/game/game.actions";
import { Sides } from "@/store/game/game.types";
import { colors } from "@/theme/colors";

const TeamWrapper = styled.div<{
    red: boolean
}>`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${props => props.red ? "rgba(200, 10, 10, 0.5)" : "rgba(10, 10, 200, 0.5)"};
    transition: filter 0.3s ease-in;
    &:hover {
        cursor: pointer;
        filter: hue-rotate(20deg)
    }
`;

const TeamTitle = styled.h5`
    font-size: 20px;
    align-self: center;

`;

const UserWrapper = styled.div`
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 20px;
    padding: 20px;
    padding-left: 50px;
    width: calc(100% - 40px);
    color: ${colors.yellow};
    position: relative;
`;

const LeaderIcon = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background-image: url(/icons/crown.png);
    background-size: cover;
    left: 15px;
    top: 10px;
`

interface TeamProps {
    team: Sides
};

const Team = ({ team } : TeamProps ) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setTeamRequest(team))
    };

    const gameMembers = useSelector((state: IState) => state.game.gameMembers);
    const teamUsers = gameMembers.filter(user => user.team === team);


    return (
        <TeamWrapper red={team === Sides.red} onClick={handleClick}>
            <TeamTitle>{team === Sides.red ? "Red Team" : "Blue Team"}</TeamTitle>

            {teamUsers && teamUsers.map((user, idx) => (
                <UserWrapper key={idx}>
                    {user.userName}
                    {user.leader && <LeaderIcon />}
                </UserWrapper>
            ))}
        </TeamWrapper>
    )
};

export default Team;