import { select } from "@/store/select";
import { colors } from "@/theme/colors";
import { IField, IRound, Sides } from "@/types/game";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const MysteryWrapper = styled.div<{team: Sides | null}>`
    
    width: 300px;
    height: 100px;
    position: absolute;
    left: 0;
    bottom: 90px;
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
    font-size: 14px;
    line-height: 18px;
    height: 25px;
`;

const MysteryKeyWord = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 800;
    color: ${colors.yellow};
`
interface MysteryProps {
    field: IField,
    round: IRound,
};

const Mystery = ({ field, round } : MysteryProps) => {

    const mystery = useSelector(select.game.mystery);

    const startTeam = field.start;
    const secondTeam = startTeam === Sides.blue ? Sides.red : Sides.blue;

    const currentTeam = round.number % 2 ? startTeam : secondTeam;

    return (
        <Fragment>
            {mystery && <MysteryWrapper team={currentTeam}>
                <MysteryHeader>
                    {`Загадоно слов - ${mystery.selectedCards.length}`}
                </MysteryHeader>
                <MysteryHeader>
                    {`Отгадано - ${mystery.answers}`}
                </MysteryHeader>

                <MysteryKeyWord>
                    {mystery.keyword}
                </MysteryKeyWord>
            </MysteryWrapper>}
        </Fragment>
        )
};

export default Mystery;