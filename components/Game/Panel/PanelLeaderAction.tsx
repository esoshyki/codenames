import { Sides } from "@/store/game/game.types";
import { IState } from "@/store/types";
import { colors } from "@/theme/colors";
import { getUserTeam } from "@/utils/user.ingame";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PanelActionButton from "./PanelActionButton";
import PanelActionWrapper from "./PanelActionWrapper";
import PanelDescriptionSpan from "./PanelDescriptionSpan";
import PanelSelectedSpan from "./PanelSelectedSpan";

const WrordsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    margin-right: 10px;
`;

const KeyWordInput = styled.input`
    width: 100%;
    background-color: transparent;
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid ${colors.blue};
    padding: 10px 30px;
    color: #fff;
    transition: all 0.3s ease-in;
    &:focus {
        outline: none !important;
    }
`;

const LeaderAction = () => {

    const selectedCards = useSelector((state: IState) => state.app.selectedCards);
    const fieldData = useSelector((state: IState) => state.game.gameData.fieldData);
    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);
    const roundNumber= useSelector((state: IState) => state.game.gameData.round.number);
    const startTeam = useSelector((state: IState) => state.game.gameData.guesserData?.start);

    const inputRef = useRef<HTMLInputElement>(null);

    const isMyCheck = () => {
        const team = getUserTeam(gameMembers, currentUser);
        const secondTeam = startTeam === Sides.blue ? Sides.red : Sides.blue;
        const activeTeam = roundNumber % 2 ? startTeam : secondTeam;
        return activeTeam === team;
    }


    useEffect(() => {
        if (!!selectedCards.length && inputRef.current) {
            inputRef.current.focus();
        }
    }, [selectedCards])

    return (
        <PanelActionWrapper>
            <WrordsContainer>
                <div>
                    <PanelDescriptionSpan>
                        {"Связать слова "}
                    </PanelDescriptionSpan>
                    <PanelSelectedSpan>
                        {fieldData && selectedCards.map((idx) => fieldData[idx]).join(", ")}
                    </PanelSelectedSpan>
                </div>
                <KeyWordInput ref={inputRef} />
            </WrordsContainer>

            {isMyCheck() ? <PanelActionButton>
                Загадать
            </PanelActionButton> : <PanelDescriptionSpan>Очередь соперника</PanelDescriptionSpan>} 
        </PanelActionWrapper>
    )

};

export default LeaderAction;