import styled from "styled-components";
import Guesser from "./Guesser";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import Field from "./Field";
import PreStart from "./PreStart";
import { GameStages } from "@/store/game/game.types";
import SelectCollection from "./SelectCollection";
import SelectLeader from "./SelectLeader";
import Panel from "./Panel";

const GameWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Game = () => {


    const { stage } = useSelector((state: IState) => state.game.gameData);
    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);

    const isLeader = () => {
        const user = gameMembers.find(user => user.userName === currentUser?.userName);

        return user?.leader
    };

    const showField = () => {
        if (GameStages.prepareField) return true;
        if (GameStages.started) return true;
        return false;
    };

    const showGuesser = () => {
        if (!isLeader()) return false;
        if (GameStages.prepareField) return true;
        if (GameStages.started) return true;
        return false;
    };

    const showPanel = () => {
        if (GameStages.prepareField) return true;
        if (GameStages.started) return true;
        return false;
    }

    return (
        <GameWrapper>

            {stage === GameStages.preStart && <PreStart />}

            {stage === GameStages.selectCollection && <SelectCollection />}
 
            {showField() && <Field />}
            {showGuesser() && <Guesser />}
            {showPanel() && <Panel />}

        </GameWrapper>
    );
};

export default Game;
