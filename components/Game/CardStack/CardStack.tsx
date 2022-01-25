import { cardType, IState } from "@/store/types";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CardStackContainer = styled.div`
    width: 230px;
    height: 130px;
    position: relative;
`;

const CardStack = () => {
    const { chosenCards, guesserData } = useSelector(
        (state: IState) => state.game
    );

    const getRedCardsCount = () =>
        chosenCards.filter((card) => card === cardType.red).length -
        guesserData.filter((card) => card === cardType.red).length;
    const getBlueCardCount = () =>
        chosenCards.filter((card) => card === cardType.blue).length -
        guesserData.filter((card) => card === cardType.blue).length;
    const getWhiteCardCount = () =>
        chosenCards.filter((card) => card === cardType.white).length -
        guesserData.filter((card) => card === cardType.white).length;

    return (
        <Fragment>
            {getRedCardsCount() && <CardStackContainer></CardStackContainer>}

            {getBlueCardCount() && <CardStackContainer></CardStackContainer>}

            {getWhiteCardCount() && <CardStackContainer></CardStackContainer>}
        </Fragment>
    );
};

export default CardStack;
