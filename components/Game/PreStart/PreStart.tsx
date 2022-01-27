import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import PreStartWaitPlayers from "./PreStartWaitPlayers";
import PreStartGameMembers from "./PreStartGameMembers";
import Teams from "./Teams";

const PreStartWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    z-index: 5000;
`;

const PreStart = () => {

    const gameMembers = useSelector((state: IState) => state.game.gameMembers);

    return (
        <PreStartWrapper>
            {gameMembers.length < 4 && (
                <PreStartWaitPlayers>
                    Ожидание игроков...
                </PreStartWaitPlayers>
            )}


            <PreStartGameMembers />

            <Teams />

        </PreStartWrapper>
    )
};

export default PreStart;