import { changeAppStageRequest } from "@/store/app/app.actions";
import { select } from "@/store/select";
import { AppStages } from "@/types/app";
import { Neutrals, Sides } from "@/types/game";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FinishWinner } from "./FinishWinner";
import t from "@/t";
import { FinishContent } from "translate/finish";
import { FinishScoreSpan } from "./FinishScoreSpan";
import { FinishScore } from "./FinishScore";
import ButtonPrimary from "@/components/Layout/Buttons/Primary";
import { setField, setRound } from "@/store/game/game.actions";

const FinishWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Finish = () => {

    const dispatch = useDispatch();

    const field = useSelector(select.game.field);
    const round = useSelector(select.game.round);
    const locale = useSelector(select.app.locale);

    const exit = () => {
        dispatch(setField());
        dispatch(setRound());
        dispatch(changeAppStageRequest(AppStages.nogame));
    };

    const isBlack = () => {
        if (!field) return false;
        const blackCard = field.cards.find(card => card.type === Neutrals.black);
        return blackCard?.covered
    }

    const getWinner = () : string => {
        if (field) {
            if (isBlack()) {
                return round?.check === Sides.red ? 
                    t.finish(locale, FinishContent.RedTeamWon) :
                    t.finish(locale, FinishContent.BlueTeamWon)
            }
        }

        return round?.check === Sides.blue ? 
            t.finish(locale, FinishContent.BlueTeamWon) :
            t.finish(locale, FinishContent.RedTeamWon);
    }

    const getRedScore = () : number => {
        if (!field?.cards) return 0;
        const redTeam = field.cards.filter(card => card.type === Sides.red && card.covered);
        return redTeam.length;
    }

    const getBlueScore = () : number => {
        if (!field?.cards) return 0;
        const blue = field.cards.filter(card => card.type === Sides.blue && card.covered);
        return blue.length;
    }

    const getReason = () : string => {
        if (isBlack()) {
            return t.finish(locale, FinishContent.BlackCard)
        } else {
            return t.finish(locale, FinishContent.AllCardsCovered)
        }
    }

    return (
        <FinishWrapper>

            <FinishWinner>
                {getWinner()}
            </FinishWinner>

            <FinishScore>

                <FinishScoreSpan red={true}>
                    {getRedScore()}
                </FinishScoreSpan>

                <span> : </span>

                <FinishScoreSpan red={false}>
                    {getBlueScore()}
                </FinishScoreSpan>

            </FinishScore>

            <FinishWinner>
                {getReason()}
            </FinishWinner>

            <ButtonPrimary onClick={exit}>
                {t.finish(locale, FinishContent.Exit)}
            </ButtonPrimary>
        </FinishWrapper>
    )
};

export default Finish;