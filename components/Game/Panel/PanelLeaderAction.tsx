import { makeMysteryRequest } from "@/store/game/game.actions";
import { select } from "@/store/select";
import { colors } from "@/theme/colors";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PanelProps } from "./Panel";
import PanelActionButton from "./PanelActionButton";
import PanelActionWrapper from "./PanelActionWrapper";
import PanelDescriptionSpan from "./PanelDescriptionSpan";
import PanelSelectedSpan from "./PanelSelectedSpan";

const WordsContainer = styled.div`
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

const LeaderAction = ({ round, currentUser } : PanelProps) => {

    const dispatch = useDispatch();

    const selectedCards = useSelector(select.game.selectedCards);
    const mystery = useSelector(select.game.mystery);

    const inputRef = useRef<HTMLInputElement>(null);

    const isMyCheck = () => {
        console.log(round.check === currentUser.team)
        return round.check === currentUser.team
    }

    useEffect(() => {
        if (!!selectedCards.length && inputRef.current) {
            inputRef.current.focus();
        }
    }, [selectedCards]);

    const makeMystery = () => {

        if (inputRef.current?.value) {
            dispatch(makeMysteryRequest({
                keyword: inputRef.current.value,
                selectedItems: selectedCards 
            }))
        }
    };

    return (
        <PanelActionWrapper>

            <WordsContainer>
                {!mystery && <div>
                    <PanelDescriptionSpan>
                        {"Связать слова "}
                    </PanelDescriptionSpan>
                    <PanelSelectedSpan>

                    </PanelSelectedSpan>
                </div>}
                
                {!mystery && <KeyWordInput ref={inputRef} />}
                </WordsContainer>

                {(isMyCheck() && !mystery && selectedCards.length > 0) && <PanelActionButton onClick={makeMystery}>
                    Загадать
                </PanelActionButton>}

        </PanelActionWrapper>
    )

};

export default LeaderAction;