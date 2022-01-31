import { wordCollections } from "utils/wordCollections";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setCollection } from "@/store/game/game.actions";
import { IState } from "@/store/types";

const ChoouseCollection = styled.select`
    height: 30px;
    background: none;
    width: 80%;
`;

const StyledOption = styled.option`
    background: none !important;
    padding: 10px;
    height: 40px;
`;

const FieldChooseCollection = () => {
    const dispatch = useDispatch();

    const collection = useSelector((state: IState) => state.game.gameData.collection);

    const select = (e: any) => {
        const idx = e.target.value;

        console.log(idx);
        dispatch(setCollection(wordCollections[idx]));
    };

    const getValue = () => {
        if (collection) {
            return wordCollections.indexOf(collection);
        }
    };

    return (
        <ChoouseCollection onChange={select} value={getValue()}>
            {wordCollections.map((col, idx) => {
                return (
                    <StyledOption key={idx} value={idx}>
                        {col.title}
                    </StyledOption>
                );
            })}
        </ChoouseCollection>
    );
};

export default FieldChooseCollection;
