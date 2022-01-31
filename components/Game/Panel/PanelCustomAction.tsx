import ActionWrapper from "./PanelActionWrapper";
import PanelActionButton from "./PanelActionButton";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import PanelDescriptionSpan from "./PanelDescriptionSpan";
import { Fragment } from "react";
import PanelSelectedSpan from "./PanelSelectedSpan";

const CustomAction = () => {

    const selectedCards = useSelector((state: IState) => state.app.selectedCards);
    const guesserData = useSelector((state: IState) => state.game.gameData.fieldData);

    const selectedWord = guesserData ? guesserData[selectedCards[0]] : null;

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
                <PanelActionButton>
                    Голосовать
                </PanelActionButton>
            )}

        </ActionWrapper>
    )
};

export default CustomAction;