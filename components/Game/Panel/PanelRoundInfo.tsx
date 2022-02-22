import { select } from "@/store/select";
import { colors } from "@/theme/colors";
import { IField, IRound, Sides } from "@/types/game";
import { getCheck } from "@/utils/game.get.check";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PanelRoundInfoWrapper = styled.div<{
    blue: boolean
}>`
    width: 300px;
    height: 100px;
    position: absolute;
    left: calc(50vw - 150px);
    bottom: 0;
    background-color: ${props => props.blue ? colors.blue : colors.red};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    text-align: center;
    border-radius: 20px;
`;

const PanelRoundInfoSpan = styled.span`
    width: 300px;
    text-align: center;
    margin: 10px 0;
`

interface Props {
    round: IRound,
    field: IField
}

const PanelRoundInfo = ({ round, field } : Props) => {
    
    const check = getCheck(round, field.start);
    
    const mystery = useSelector(select.game.mystery)

    const status = mystery ? "Отгадывает " : "Загадывает ";
    const team = check === Sides.blue ? "Синяя команда" : "Красная команда"

    return (
        <PanelRoundInfoWrapper blue={check === Sides.blue}>
            <PanelRoundInfoSpan>{`Round № ${round.number} `}</PanelRoundInfoSpan>
            <PanelRoundInfoSpan>{status + team}</PanelRoundInfoSpan>
        </PanelRoundInfoWrapper>
    )
};

export default PanelRoundInfo;