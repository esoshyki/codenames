import styled from "styled-components";
import Team from "./Team";
import { GameStages, Sides } from "@/store/game/game.types";
import { colors } from "@/theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { setGameStage, setLeaderRequest, toggleReadyRequest } from "@/store/game/game.actions";
import { IState } from "@/store/types";
import { allReady, teamsAreComplete } from "../lib";

const TeamsWrapper = styled.div`
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    flex-wrap: wrap;
`

const TeamsButton = styled.button`
    width: calc(100% - 40px);
    margin: 20px;
    padding: 20px;
    background: none;
    border-radius: 20px;
    border: 1px solid ${colors.green};
    color: ${colors.green};
    transition: 0.3s ease-in;
    &:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.3);
    }
`;


const Teams = () => {

    const dispatch = useDispatch();

    const gameUsers = useSelector((state: IState) => state.game.gameMembers);
    const currentUser = useSelector((state: IState) => state.users.currentUser);

    const makeMeALeader = () => {
        dispatch(setLeaderRequest())
    };

    const toogleReady = () => {
        dispatch(toggleReadyRequest())
    };

    return (
        <TeamsWrapper>
            <Team team={Sides.red} />
            <Team team={Sides.blue} />

            <TeamsButton onClick={makeMeALeader}>
                Make me leader
            </TeamsButton>

            {teamsAreComplete(gameUsers) && <TeamsButton onClick={toogleReady}>
                {gameUsers.some(user => user.userName === currentUser?.userName && user.ready) ? "Not ready" : "Get Ready"}
            </TeamsButton>}

        
        </TeamsWrapper>
    )
};

export default Teams;