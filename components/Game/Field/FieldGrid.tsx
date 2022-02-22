import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import FieldCard from "./FieldCard";
import { Fragment } from "react";
import { FieldProps } from "./Field";
import { select } from "@/store/select";
import { makeVoteRequest, setSelectedCards } from "@/store/game/game.actions";

const FieldGridWrapper = styled.div`
    position: fixed;
    left: 200px;
    top: 50px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-auto-columns: 180px;
    max-width: 800px;
`;

const VoteButton = styled.button`
    padding: 20px;
    grid-column: 3;
`

const FieldGrid = ({ field, round, currentUser } : FieldProps) => {

    const selectedCards = useSelector(select.game.selectedCards);

    const dispatch = useDispatch();

    const cards = field.cards;

    const leaderSelect = (idx: number) => {
        const newSelected = selectedCards.includes(idx) ? 
            selectedCards.filter(el => el !== idx) :
            [...selectedCards, idx];
        dispatch(setSelectedCards(newSelected))
    };

    const customSelect = (idx: number) => {
        const newSelected = selectedCards.includes(idx) ? 
            selectedCards.filter(el => el !== idx) :
            [idx];
            dispatch(setSelectedCards(newSelected))      
    };

    const onClick = (idx: number) => {
        currentUser.leader ? leaderSelect(idx) : customSelect(idx)
    };

    const makeVote = () => {
        dispatch(makeVoteRequest(selectedCards[0]))
    };

    const showVotedButton = () => {
        if (currentUser.leader) return false;
        if (selectedCards.length === 0) return false;
        if (round.check !== currentUser.team) return false;
        if (field.cards[selectedCards[0]].covered) return false;
        return true
    }

    return (
        <FieldGridWrapper>
            {cards.map((card, idx) => {
                return (
                    <Fragment key={idx}>
                        <FieldCard 
                            votes={card.votes}
                            setSelected={() => onClick(idx)}
                            selected={selectedCards.includes(idx)} 
                            word={card.text} 
                            covered={card.covered}
                            type={card.type}
                            id={card.id}
                            />
                    </Fragment>
                );
            })}

            {showVotedButton() && <VoteButton onClick={makeVote}>Голосовать</VoteButton>}

        </FieldGridWrapper>
    );
};

export default FieldGrid;
