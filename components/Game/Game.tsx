import styled from "styled-components";
import Guesser from "./Guesser";
import { useSelector } from "react-redux";
import Field from "./Field";
import Panel from "./Panel";
import Mystery from "./Mystery";
import { select } from "@/store/select";

const GameWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(/images/wood_table.jpg);
    background-size: cover;
    background-repeat: no-repeat;
`;

const Game = () => {

    const currentUser = useSelector(select.connection.currentUser);
    const round = useSelector(select.game.round);
    const field = useSelector(select.game.field);

    return (
        <GameWrapper>

            {!!(field && round) && (
                <Field field={field} round={round} currentUser={currentUser}/>
            )}

            {!!(currentUser.leader && field) && <Guesser field={field}/>}

            {!!(currentUser && field && round) && (
                <Panel currentUser={currentUser} field={field} round={round} />
            )}

            {!!(round && field) && (
                <Mystery round={round} field={field} />
            )}

        </GameWrapper>
    );
};

export default Game;
