import styled from "styled-components";
import Team from "./Team";
import { Sides } from "@/store/game/game.types";
import { useDispatch, useSelector } from "react-redux";
import { setLeaderRequest, toggleReadyRequest } from "@/store/game/game.actions";
import { IState } from "@/store/types";
import { teamsAreComplete } from "../PreStart/lib";

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

    const gameUsers = useSelector((state: IState) => state.game.gameMembers);
    const currentUser = useSelector((state: IState) => state.users.currentUser);

    const makeMeALeader = () => {
        dispatch(setLeaderRequest())
    };

    const toogleReady = () => {
        dispatch(toggleReadyRequest())
    };

    const isUserALeader = () => gameUsers.find(user => user.userName === currentUser?.userName)?.leader;

    return (
        <TeamsWrapper>

            <Team team={Sides.red} />
            <Team team={Sides.blue} />

            <TeamsButtonsWrapper>

                <TeamsButton onClick={makeMeALeader}>
                    {isUserALeader() ? "Don't be a leader" : "Make me a leader"}
                </TeamsButton>

                {teamsAreComplete(gameUsers) && <TeamsButton onClick={toogleReady}>
                    {gameUsers.some(user => user.userName === currentUser?.userName && user.ready) ? "Not ready" : "Get Ready"}
                </TeamsButton>}

            </TeamsButtonsWrapper>

        
        </TeamsWrapper>
    )
};

export default Teams;