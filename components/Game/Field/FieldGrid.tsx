import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import FieldCard from "./FieldCard";
import { Fragment } from "react";
import { isLeader } from "@/utils/user.ingame";
import { setSelectedCards } from "@/store/app/app.actions";

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

    const fieldData = useSelector((state: IState) => state.game.gameData.fieldData);
    const currentUser = useSelector((state: IState) => state.users.currentUser);
    const gameMembers = useSelector((state: IState) => state.game.gameMembers);
    const selectedCards = useSelector((state: IState) => state.app.selectedCards);

    const data = fieldData || new Array(25).fill("");

    const leaderSelect = (idx: number) => {
        if (selectedCards.includes(idx)) {
            setSelectedCards(selectedCards.filter(el => el !== idx))
        } else {
            setSelectedCards([...selectedCards, idx])
        }
    };

    const customSelect = (idx: number) => {
        if (selectedCards.includes(idx)) {
            setSelectedCards([])
        } else {
            setSelectedCards([idx])
        }
    };

    const onClick = (idx: number) => {
        if (isLeader(gameMembers, currentUser)) {
            leaderSelect(idx)
        } else {
            customSelect(idx)
        }
    };

    return (
        <FieldGridWrapper>
            {data &&
                data.map((el, idx) => {
                    return (
                        <Fragment key={idx}>
                            <FieldCard 
                                setSelected={() => onClick(idx)}
                                selected={selectedCards.includes(idx)} 
                                word={el} />
                        </Fragment>
                    );
                })}

                {/* {data && selected && <button>
                    {`Голосовать за ${data[selected]}`}
                </button>} */}
        </FieldGridWrapper>
    );
};

export default FieldGrid;
