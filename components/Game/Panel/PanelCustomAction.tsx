import ActionWrapper from "./PanelActionWrapper";
import PanelActionButton from "./PanelActionButton";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/store/types";
import PanelDescriptionSpan from "./PanelDescriptionSpan";
import { Fragment } from "react";
import PanelSelectedSpan from "./PanelSelectedSpan";
import { getUserTeam, isMyCheck } from "@/utils/user.ingame";
import { getCurrentUser } from "@/store/users/users.selectors";
import { getGameMembers } from "@/store/game/game.selectors";
import { customCardVoteRequest } from "@/store/app/app.actions";

const CustomAction = () => {

    const dispatch = useDispatch();

    const selectedCards = useSelector((state: IState) => state.app.selectedCards);
    const guesserData = useSelector((state: IState) => state.game.gameData.fieldData);
    const roundNumber = useSelector((state: IState) => state.game.gameData.round.number);
    const start = useSelector((state: IState) => state.game.gameData.guesserData?.start);
    const currentUser = useSelector(getCurrentUser);
    const gameMembers = useSelector(getGameMembers);

    const myTeam = getUserTeam(gameMembers, currentUser);

    const myCheck = isMyCheck(roundNumber, myTeam, start);


    const selectedWord = guesserData ? guesserData[selectedCards[0]] : null;

    const vote = () => {
        dispatch(customCardVoteRequest(selectedCards[0]))
    };
    
    return (
        <ActionWrapper>

            {!selectedWord && <PanelDescriptionSpan>Предложите слово</PanelDescriptionSpan>}

            {selectedWord && (
                <Fragment>
                    <PanelDescriptionSpan>Проголосовать за слово</PanelDescriptionSpan>
                    <PanelSelectedSpan style={{marginLeft: 10}}>{" " + selectedWord + " "}</PanelSelectedSpan>
                </Fragment>
            )}

            {selectedWord && (
                <PanelActionButton disabled={!myCheck} onClick={vote}>
                    {myCheck ? "Голосовать" : "Ход противника"}
                </PanelActionButton>
            )}

        </ActionWrapper>
    )
};

export default CustomAction;