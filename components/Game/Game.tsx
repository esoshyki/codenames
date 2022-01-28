import styled from "styled-components";
import Guesser from "./Guesser";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/store/types";
import Field from "./Field";
import PreStart from "./PreStart";
import { GameStages } from "@/store/game/game.types";
import SelectCollection from "./SelectCollection";

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

    const { stage } = useSelector((state: IState) => state.game.gameData);

    const round = stage.round;

    return (
        <GameWrapper>

            {round === GameStages.preStart && <PreStart />}

            {round === GameStages.selectCollection && <SelectCollection />}
 
            {round === GameStages.prepareField && <Field />}
            {round === GameStages.prepareField && <Guesser />}



        </GameWrapper>
    );
};

export default Game;
