import { Fragment, useRef, useState, DragEvent, MouseEvent } from "react";
import styled from "styled-components";
import GuesserLamp from "./GuesserLamp";
import { LampPos } from "./GuesserLamp";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import GuessItem from "./GuessItem";

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
`;

const startBottom = 140;
const startRight = 420;

const Guesser = () => {

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({right: startRight, bottom: startBottom})
    const [startPos, setStartPos] = useState({x: 0, y: 0});
    const [mouseDown, setMouseDown] = useState(false);


    const onMouseDown = (e: DragEvent<HTMLDivElement>) => {
        setMouseDown(true)
        setStartPos({
            x: e.pageX,
            y: e.pageY
        });
    };

    const onMouseUp = () => {
        setMouseDown(false)
    }

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const deltaX = e.pageX - startPos.x;
        const deltaY = e.pageY - startPos.y;

        setPosition({right: startRight - deltaX, bottom: startBottom - deltaY});

    }    

    const guesserData = useSelector((state: IState) => state.game.gameData.guesserData);

    return (
        <GuesserWrapper 
            right={position.right}
            bottom={position.bottom}
            ref={wrapperRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={(e) => mouseDown ? onMouseMove(e) : null}
            >
            {guesserData &&
                guesserData.data && guesserData.data.map((el, idx) => (
                    <Fragment key={idx}>
                        <GuessItem type={el} idx={idx} />
                    </Fragment>
                ))}

            {guesserData?.start && (
                <Fragment>
                    <GuesserLamp position={LampPos.left} />
                    <GuesserLamp position={LampPos.top} />
                    <GuesserLamp position={LampPos.right} />
                    <GuesserLamp position={LampPos.bottom} />
                </Fragment>
            )}
        </GuesserWrapper>
    );
};

export default Guesser;
