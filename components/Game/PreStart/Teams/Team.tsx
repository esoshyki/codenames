import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";

const TeamWrapper = styled.div<{
    red: boolean
}>`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: ${props => props.red ? "rgba(200, 10, 10, 0.5)" : "rgba(10, 200, 10, 0.5)"};
    transition: filter 0.3s ease-in;
    &:hover {
        cursor: pointer;
        filter: hue-rotate(20deg)
    }
`;

const TeamTitle = styled.h5`
    font-size: 20px;

`;

const UserWrapper = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`

interface TeamProps {
    team: "blue" | "red"
};

const Team = ({ team } : TeamProps ) => {


    const handleClick = () => {
        
    }
    

    const gameMembers = useSelector((state: IState) => state.game.gameMembers);

    const teamUsers = gameMembers.filter(user => user.team === team);

    return (
        <TeamWrapper red={team === "red"} onClick={handleClick}>
            <TeamTitle>{team === "red" ? "Read Team" : "Blue Team"}</TeamTitle>

            {teamUsers && teamUsers.map((user) => (
                <UserWrapper>
                    {user.userName}
                </UserWrapper>
            ))}
        </TeamWrapper>
    )
};

export default Team;