import styled from "styled-components";
import Team from "./Team";
import { useDispatch, useSelector } from "react-redux";
import { teamsComplete } from "./utils/teams.complete";
import { select } from "@/store/select";
import { Sides } from "@/types/game";
import t from "@/t";
import { PrestartContent } from "translate/prestart";
import { toggleLeaderRequest } from "@/store/game/game.actions";

const TeamsWrapper = styled.div`
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    flex-wrap: wrap;
`;

const TeamsButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const TeamsButton = styled.button`
    width: calc(100% - 40px);
    max-width: 300px;
    margin: 20px;
    padding: 20px;
    background: none;
    border-radius: 20px;
    border: 3px solid #fff;
    color: #fff;
    font-weight: 900;
    transition: 0.3s ease-in;
    &:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.3);
    }
`;


const Teams = () => {

    const dispatch = useDispatch();

    const gameMembers = useSelector(select.game.gameMembers);
    const currentUser = useSelector(select.connection.currentUser);
    const redTeam = useSelector(select.game.redTeam);
    const blueTeam = useSelector(select.game.blueTeam);
    const locale = useSelector(select.app.locale);

    const makeMeALeader = () => {
        dispatch(toggleLeaderRequest())
    };

    const toogleReady = () => {

    };

    const isUserALeader = () => gameMembers.find(user => user.userName === currentUser?.userName)?.leader;

    return (
        <TeamsWrapper>

            <Team side={Sides.red} />
            <Team side={Sides.blue} />

            <TeamsButtonsWrapper>

                <TeamsButton onClick={makeMeALeader}>
                    {isUserALeader() ? 
                        t.preStart(locale, PrestartContent.dontBeALeader) :
                        t.preStart(locale, PrestartContent.makeMeALeader)}
                </TeamsButton>

                {teamsComplete(blueTeam, redTeam) && (
                    <TeamsButton onClick={toogleReady}>
                        {currentUser.ready ? 
                    t.preStart(locale, PrestartContent.ready) :
                    t.preStart(locale, PrestartContent.notReady)    
                    }
                    </TeamsButton>
                )}

            </TeamsButtonsWrapper>

        
        </TeamsWrapper>
    )
};

export default Teams;