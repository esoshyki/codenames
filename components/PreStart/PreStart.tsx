import styled from "styled-components";
import { useSelector } from "react-redux";
import PreStartHeader from "./PreStartHeader";
import PreStartGameMembers from "./PreStartGameMembers";
import { select } from "@/store/select";
import Teams from "./Teams";
import t from "@/t";
import { PrestartContent } from "../../translate/prestart";

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

    const gameMembers = useSelector(select.game.gameMembers);
    const locale = useSelector(select.app.locale);

    const getHeaderContent = () : string => {

        return "Teams are complete. Get ready to start"
    };

    return (
        <PreStartWrapper>
            {gameMembers.length < 4 && (
                <PreStartHeader>
                    {t.preStart(locale, PrestartContent.waitingForPlayers)}
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