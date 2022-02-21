import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "@/types";
import { Sides } from "@/types/game";
import { colors } from "@/theme/colors";
import { select } from "@/store/select";
import { Locales } from "translate/locales";
import t from "@/t";
import { PrestartContent } from "translate/prestart";

const TeamWrapper = styled.div<{
    red: boolean,
    leave: boolean,
    locale: Locales
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
            position: absolute;
            box-sizing: border-box;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            text-align: center;
            padding: 20px;
            content: "${props => {
                if (props.red) {
                    return props.leave ? 
                        t.preStart(props.locale, PrestartContent.leaveRedTeam) :
                        t.preStart(props.locale, PrestartContent.joinRedTeam)
                } else {
                    return props.leave ? 
                        t.preStart(props.locale, PrestartContent.leaveBlueTeam) :
                        t.preStart(props.locale, PrestartContent.joinBlueTeam);                
                }}}";
        }
    }`


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
    side: Sides
};

const Team = ({ side } : TeamProps ) => {

    const dispatch = useDispatch();

    const handleClick = () => {

    };

    const gameMembers = useSelector(select.game.gameMembers);
    const currentUser = useSelector(select.connection.currentUser);
    const team = useSelector(side === Sides.blue ? select.game.blueTeam : select.game.redTeam);
    const teamUsers = team.members;
    const locale = useSelector(select.app.locale);

    const isUserInTeam = () => Boolean(teamUsers.find(user => user.userName === currentUser?.userName));

    return (
        <TeamWrapper 
            red={team.side === Sides.red} 
            leave={isUserInTeam()}
            onClick={handleClick}
            locale={locale}
            >

            {teamUsers && teamUsers.map((user, idx) => (
                <UserWrapper team={team.side}  key={idx}>
                    {user.userName + (currentUser?.userName === user.userName ? " (You)" : "")}
                    {user.leader && <LeaderIcon />}
                </UserWrapper>
            ))}
        </TeamWrapper>
    )
};

export default Team;