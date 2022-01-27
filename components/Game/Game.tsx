import styled from "styled-components";
import Guesser from "./Guesser";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/store/types";
import Field from "./Field";
import PreStart from "./PreStart";

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

    const dispatch = useDispatch();

    const { collection, round } = useSelector((state: IState) => state.game.gameData);
    const roundNumber = round.number;

    return (
        <GameWrapper>

            {roundNumber === 0 && <PreStart />}
 
            <Field />
            <Guesser />

        </GameWrapper>
    );
};

export default Game;
