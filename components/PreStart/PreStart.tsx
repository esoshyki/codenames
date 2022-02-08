import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import PreStartHeader from "./PreStartHeader";
import PreStartGameMembers from "./PreStartGameMembers";
import Teams from "../Game/Teams";
import { teamsAreComplete } from "./lib";

const PreStartWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 4000;
`;

const PreStart = () => {

    const gameMembers = useSelector((state: IState) => state.game.gameMembers);

    const getHeaderContent = () : string => {

        if (!teamsAreComplete(gameMembers)) {
            return "Teams are not complete"
        };

        return "Teams are complete. Get ready to start"
    };

    return (
        <PreStartWrapper>
            {gameMembers.length < 4 && (
                <PreStartHeader>
                    Waiting for players
                </PreStartHeader>
            )}

            {gameMembers.length >= 4 && (
                <PreStartHeader>
                    {getHeaderContent()}
                </PreStartHeader>
            )}


            <PreStartGameMembers />

            <Teams />

        </PreStartWrapper>
    )
};

export default PreStart;