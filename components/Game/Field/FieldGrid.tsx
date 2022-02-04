import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/store/types";
import FieldCard from "./FieldCard";
import { Fragment } from "react";
import { isLeader } from "@/utils/user.ingame";
import { setSelectedCards } from "@/store/app/app.actions";
import { getRoundVotes } from "@/store/game/game.selectors";

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

const FieldGrid = () => {

    const dispatch = useDispatch();

    const fieldData = useSelector((state: IState) => state.game.gameData.fieldData);
    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);
    const selectedCards = useSelector((state: IState) => state.app.selectedCards);
    const votes = useSelector(getRoundVotes);

    const data = fieldData || new Array(25).fill("");

    const leaderSelect = (idx: number) => {
        if (selectedCards.includes(idx)) {
            dispatch(setSelectedCards(selectedCards.filter(el => el !== idx)));
        } else {
            dispatch(setSelectedCards([...selectedCards, idx]));
        }
    };

    const customSelect = (idx: number) => {
        if (selectedCards.includes(idx)) {
            dispatch(setSelectedCards([]));
        } else {
            dispatch(setSelectedCards([idx]));
        }
    };

    const onClick = (idx: number) => {

        if (isLeader(gameMembers, currentUser)) {
            console.log("leader");
            leaderSelect(idx)
        } else {
            customSelect(idx)
        }
    };

    const getVotedBy = (idx: number) : string[] | null => {
        const users = votes.filter(vote => vote.cardIdx === idx);
        if (users.length) {
            return users.map(user => user.userName);
        };

        return null
    }

    return (
        <FieldGridWrapper>
            {data &&
                data.map((el, idx) => {
                    return (
                        <Fragment key={idx}>
                            <FieldCard 
                                votedBy={getVotedBy(idx)}
                                setSelected={() => onClick(idx)}
                                selected={selectedCards.includes(idx)} 
                                word={el} />
                        </Fragment>
                    );
                })}

        </FieldGridWrapper>
    );
};

export default FieldGrid;
