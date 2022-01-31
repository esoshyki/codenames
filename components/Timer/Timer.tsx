import { IState } from "@/store/types";
import { colors } from "@/theme/colors";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

const TimerWrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 7000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${colors.yellow};
`;

const spanAnimation = keyframes`
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
`;

const TimerSpan = styled.span`
    font-size: 80px;
    font-weight: 800;
    animation: ${spanAnimation} 0.3s ease-in 0s;
`;

const Timer = () => {

    const timer = useSelector((state: IState) => state.app.timer);

    return (
        <Fragment>
            {typeof timer === "number" && (
                <TimerWrapper>
                    <TimerSpan>{timer}</TimerSpan>
                </TimerWrapper>)}
        </Fragment>
    )
};

export default Timer;