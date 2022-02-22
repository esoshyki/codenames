import ActionWrapper from "./PanelActionWrapper";
import PanelActionButton from "./PanelActionButton";
import { useDispatch, useSelector } from "react-redux";
import PanelDescriptionSpan from "./PanelDescriptionSpan";
import { Fragment } from "react";
import PanelSelectedSpan from "./PanelSelectedSpan";
import { IField, IRound } from "@/types/game";
import { select } from "@/store/select";
import { getCheck } from "@/utils/game.get.check";
import { PanelProps } from "./Panel";

const CustomAction = ({ field, round, currentUser } : PanelProps) => {

    const dispatch = useDispatch();
    
    const selectedCards = useSelector(select.game.selectedCards);
    const myTeam = currentUser.team;

    const check = getCheck(round, field.start);
    const myCheck = check === myTeam;


    const selectedWord = null;

    const vote = () => {

    };

    return (
        <ActionWrapper>

            {!selectedWord && <PanelDescriptionSpan>Предложите слово</PanelDescriptionSpan>}

            {selectedWord && (
                <Fragment>
                    <PanelDescriptionSpan>Проголосовать за слово</PanelDescriptionSpan>
                    <PanelSelectedSpan style={{marginLeft: 10}}>{" " + selectedWord + " "}</PanelSelectedSpan>
                </Fragment>
            )}

            {selectedWord && (
                <PanelActionButton disabled={!myCheck} onClick={vote}>
                    {myCheck ? "Голосовать" : "Ход противника"}
                </PanelActionButton>
            )}

        </ActionWrapper>
    )
};

export default CustomAction;