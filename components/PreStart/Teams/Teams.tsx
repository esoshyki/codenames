import styled from "styled-components";
import Team from "./Team";
import { useDispatch, useSelector } from "react-redux";
import { teamsComplete } from "./utils/teams.complete";
import { select } from "@/store/select";
import { Sides } from "@/types/game";
import t from "@/t";
import { PrestartContent } from "translate/prestart";
import { toggleLeaderRequest, toggleReadyRequest } from "@/store/game/game.actions";
import { changeAppStageRequest } from "@/store/app/app.actions";
import { AppStages } from "@/types/app";

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

const TeamsButton = styled.button<{
    disabled: boolean
}>`
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
    opacity: ${props => props.disabled ? 0.5 : 1};
    &:hover {
        cursor: ${props => props.disabled ? "initial" : "pointer"};
        background: ${props => props.disabled ? "none" : "rgba(0, 0, 0, 0.3)"};
    }
`;


const Teams = () => {

    const dispatch = useDispatch();

    const gameMembers = useSelector(select.game.gameMembers);
    const currentUser = useSelector(select.connection.currentUser);
    const redTeam = useSelector(select.game.redTeam);
    const blueTeam = useSelector(select.game.blueTeam);
    const locale = useSelector(select.app.locale);
    const field = useSelector(select.game.field);
    const round = useSelector(select.game.round);

    const makeMeALeader = () => {
        dispatch(toggleLeaderRequest())
    };

    const toogleReady = () => {
        dispatch(toggleReadyRequest())
    };

    const isUserALeader = () => gameMembers.find(user => user.userName === currentUser?.userName)?.leader;

    const isStarted = () => !!field || !!round;

    const join = () => {
        if (currentUser.team) {
            dispatch(changeAppStageRequest(AppStages.game));
        }
    }

    return (
        <TeamsWrapper>

            <Team side={Sides.red} />
            <Team side={Sides.blue} />

            <TeamsButtonsWrapper>

                {!isStarted() && <TeamsButton onClick={makeMeALeader} disabled={false}>
                    {isUserALeader() ? 
                        t.preStart(locale, PrestartContent.dontBeALeader) :
                        t.preStart(locale, PrestartContent.makeMeALeader)}
                </TeamsButton>}

                {teamsComplete(blueTeam, redTeam) && !isStarted() && (
                    <TeamsButton onClick={toogleReady} disabled={false}>
                        {currentUser.ready ? 
                    t.preStart(locale, PrestartContent.notReady) :
                    t.preStart(locale, PrestartContent.ready)    
                    }
                    </TeamsButton>
                )}

                {isStarted() && (
                    <TeamsButton onClick={join} disabled={!currentUser.team}>
                        {t.preStart(locale, PrestartContent.JoinGame)}
                    </TeamsButton>
                )}

            </TeamsButtonsWrapper>

        
        </TeamsWrapper>
    )
};

export default Teams;