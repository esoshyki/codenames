import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import FieldCard from "./FieldCard";
import { Fragment, useState } from "react";

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

    const data = fieldData || new Array(25).fill("");

    const [selected, setSelected] = useState<number | null>(null);

    const onClick = (idx: number) => {
        setSelected(selected === idx ? null : idx);
    };

    return (
        <FieldGridWrapper>
            {data &&
                data.map((el, idx) => {
                    return (
                        <Fragment key={idx}>
                            <FieldCard 
                                setSelected={() => onClick(idx)}
                                selected={selected === idx} 
                                word={el} />
                        </Fragment>
                    );
                })}
        </FieldGridWrapper>
    );
};

export default FieldGrid;
