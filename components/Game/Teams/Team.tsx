import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "@/store/types";
import { setTeamRequest } from "@/store/game/game.actions";
import { Sides } from "@/store/game/game.types";
import { colors } from "@/theme/colors";

const TeamWrapper = styled.div<{
    red: boolean,
    leave: boolean
}>`
    position: relative;;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${props => props.red ? "rgba(200, 10, 10, 0.5)" : "rgba(10, 10, 200, 0.5)"};
    transition: filter 0.3s ease-in;
    &:hover {
        cursor: pointer;
        filter: hue-rotate(20deg);
        &::after {
            content: "${props => `${props.leave ? "Leave" : "Join"} ${props.red ? "red" : "blue"} team`}";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
        }
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
    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const teamUsers = gameMembers.filter(user => user.team === team);

    const isUserInTeam = () => Boolean(teamUsers.find(user => user.userName === currentUser?.userName));

    return (
        <TeamWrapper 
            red={team === Sides.red} 
            leave={isUserInTeam()}
            onClick={handleClick}
            >
            <TeamTitle>{team === Sides.red ? "Red Team" : "Blue Team"}</TeamTitle>

            {teamUsers && teamUsers.map((user, idx) => (
                <UserWrapper key={idx}>
                    {user.userName + (currentUser?.userName === user.userName ? " (You)" : "")}
                    {user.leader && <LeaderIcon />}
                </UserWrapper>
            ))}
        </TeamWrapper>
    )
};

export default Team;