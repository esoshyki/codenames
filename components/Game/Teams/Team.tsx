import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "@/store/types";
import { setTeamRequest } from "@/store/game/game.actions";
import { Sides } from "@/store/game/game.types";
import { colors } from "@/theme/colors";
import { getUserTeam } from "@/utils/user.ingame";

const TeamWrapper = styled.div<{
    red: boolean,
    leave: boolean
}>`
    position: relative;;
    width: 50%;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-image: ${props => props.red ? "url(/images/red_wood.jpg)" : "url(/images/blue_wood.jpg)"};
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


const UserWrapper = styled.div<{
    team: Sides | null
}>`
    background-color: rgba(255, 255, 255, 0.4);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 20px;
    padding: 20px;
    padding-left: 100px;
    width: calc(100% - 40px);
    color: ${colors.yellow};
    position: relative;
    &::after {
        content: "";
        position: absolute;
        width: 75px;
        height: 50px;
        background-size: cover;
        left: 10px;
        background-image: ${props => {
            switch (props.team) {
                case Sides.blue:
                    return "url(/images/blue_card.jpg)";
                case Sides.red:
                    return "url(/images/red_card.jpg)";
            }
        }
    }
}`

const LeaderIcon = styled.div`
    position: absolute;
    width: 20px;
    height: 20px;
    background-image: url(/icons/crown.png);
    background-size: cover;
    right: 15px;
    top: calc(50% - 10px);
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

            {teamUsers && teamUsers.map((user, idx) => (
                <UserWrapper team={team}  key={idx}>
                    {user.userName + (currentUser?.userName === user.userName ? " (You)" : "")}
                    {user.leader && <LeaderIcon />}
                </UserWrapper>
            ))}
        </TeamWrapper>
    )
};

export default Team;