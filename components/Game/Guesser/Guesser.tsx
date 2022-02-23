import { Fragment, useRef, useState, DragEvent, MouseEvent } from "react";
import styled from "styled-components";
import GuesserLamp from "./GuesserLamp";
import { LampPos } from "./GuesserLamp";
import GuessItem from "./GuessItem";
import { IField, Sides } from "@/types/game";

const GuesserWrapper = styled.div<{
    right: number, bottom: number
}>`
    position: fixed;
    bottom: ${props => props.bottom}px;
    right: ${props => props.right}px;
    height: 218px;
    width: 218px;
    background-image: url(/images/guesser.png);
    border-radius: 15px;
    z-index: 20000;
    &:-webkit-user-drag {
        user-select: none;
    }
`;

interface GuesserProps {
    field: IField
}

const Guesser = ({ field } : GuesserProps) => {

    const wrapperRef = useRef<HTMLDivElement>(null);


    const start = field.cards
        .filter(el => el.type === Sides.blue).length === 9 ? 
        Sides.blue : Sides.red; 

    return (
        <GuesserWrapper 
            right={20}
            bottom={100}
            ref={wrapperRef}
            >
            {field.cards.map((card, idx) => (
                    <Fragment key={idx}>
                        <GuessItem type={card.type} idx={idx} />
                    </Fragment>
                ))}

                <GuesserLamp start={start} position={LampPos.left} />
                <GuesserLamp start={start}  position={LampPos.top} />
                <GuesserLamp start={start}  position={LampPos.right} />
                <GuesserLamp start={start}  position={LampPos.bottom} />

        </GuesserWrapper>
    );
};

export default Guesser;
