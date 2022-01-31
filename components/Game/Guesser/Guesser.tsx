import { Fragment } from "react";
import styled from "styled-components";
import GuesserLamp from "./GuesserLamp";
import { LampPos } from "./GuesserLamp";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import GuessItem from "./GuessItem";

const GuesserWrapper = styled.div`
    position: fixed;
    bottom: 150px;
    left: calc(50vw - 109px);
    height: 218px;
    width: 218px;
    background-image: url(/images/guesser.png);
    border-radius: 15px;
`;
const Guesser = () => {

    const guesserData = useSelector((state: IState) => state.game.gameData.guesserData);

    return (
        <GuesserWrapper>
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
