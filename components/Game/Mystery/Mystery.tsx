import { Sides } from "@/store/game/game.types";
import { IState } from "@/store/types";
import { colors } from "@/theme/colors";
import { whosCheck } from "@/utils/user.ingame";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MysteryWrapper = styled.div<{team: Sides | null}>`
    
    width: 500px;
    height: 300px;
    position: absolute;
    left: 0;
    bottom: 100px;
    background-image: ${props => props.team === Sides.red ? "url(/images/red_wood.jpg)" : props.team === Sides.blue ? "url(/images/blue_wood.jpg)" : "none"};
    background-color: ${colors.yellow};
`;

const MysteryHeader = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MysteryKeyWord = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 800;
    color: ${colors.yellow}
`


const Mystery = () => {

    const roundNumber = useSelector((state: IState) => state.game.gameData.round.number);
    const startTeam = useSelector((state: IState) => state.game.gameData.guesserData?.start);
    const check = whosCheck(roundNumber, startTeam);

    const mystery = useSelector((state: IState) => state.game.gameData.round.mystery);

    return (
            <MysteryWrapper team={check}>
                {mystery && (
                    <Fragment>
                        <MysteryHeader>
                            {`Загадоно слов - ${mystery.words.length}`}
                        </MysteryHeader>

                        <MysteryKeyWord>
                            {mystery.keyWord}
                        </MysteryKeyWord>
                    </Fragment>
                )}
            </MysteryWrapper>
        )
};

export default Mystery;