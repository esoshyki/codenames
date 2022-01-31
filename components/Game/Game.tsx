import styled from "styled-components";
import Guesser from "./Guesser";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import Field from "./Field";
import PreStart from "./PreStart";
import { GameStages } from "@/store/game/game.types";
import SelectCollection from "./SelectCollection";
import SelectLeader from "./SelectLeader";

const GameWrapper = styled.div`
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

    const noLeader = () => {
        const user = gameMembers.find(member => member.userName === currentUser?.userName);
        const users = gameMembers.filter(member => member.team === user?.team && member.leader);

        return users.length === 0;
    }

    return (
        <GameWrapper>

            {stage === GameStages.preStart && <PreStart />}

            {stage === GameStages.selectCollection && <SelectCollection />}
 
            {stage === GameStages.prepareField && <Field />}
            {stage === GameStages.prepareField && isLeader() && <Guesser />}

            {stage === GameStages.prepareField && noLeader() && <SelectLeader />} 

        </GameWrapper>
    );
};

export default Game;
