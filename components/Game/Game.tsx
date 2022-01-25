import styled from "styled-components";
import Guesser from "./Guesser";
import { useDispatch, useSelector } from "react-redux";
import { gameStartRequest, getWordsRequest } from "@/store/game/game.actions";
import { IState } from "@/store/types";
import Field from "./Field";

const GameWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const Button = styled.button`
    bottom: 10px;
    left: 10px;
    font-size: 20px;
    border: 1px solid #fff;
    margin: 5px 10px;
`;

const ControlPanel = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const Game = () => {
    const collection = useSelector((state: IState) => state.game.collection);

    const dispatch = useDispatch();

    const startGame = () => {
        dispatch(gameStartRequest());
    };

    const changeGuesser = () => {
        dispatch(gameStartRequest());
    };

    const changeWords = () => {
        dispatch(getWordsRequest(collection?.idx));
    };

    const { guesserData, fieldData } = useSelector(
        (state: IState) => state.game
    );

    return (
        <GameWrapper>
            <Field />

            <Guesser />

            <ControlPanel>
                {!guesserData?.length && (
                    <Button className="button" onClick={startGame}>
                        Start Game
                    </Button>
                )}

                {!!guesserData?.length && (
                    <Button className="button" onClick={changeGuesser}>
                        Change guesser
                    </Button>
                )}

                {fieldData && (
                    <Button className="button" onClick={changeWords}>
                        Change field
                    </Button>
                )}
            </ControlPanel>
        </GameWrapper>
    );
};

export default Game;
