import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "@/store/types";
import { hideInfo } from "@/store/app/app.actions";

const InfoWrapper = styled.div`
    position: fixed;
    top: 0;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const GameStateInfoAnimation = keyframes`
    0% {
        opacity: 1
    }
    50% {
        opacity: 0
    }
    100% {
        opacity: 1
    };
`;

const GameStatesInfoSpan = styled.span`
    font-size: 25px;
    font-weight: 700;
    text-align: justify;
    animation: ${GameStateInfoAnimation} 5s linear 0s;
`;

const UserAd = () => {
    const dispatch = useDispatch();
    const info = useSelector((state: IState) => state.app.info);

    const onAnimationEnd = () => {
        dispatch(hideInfo())
    };

    return (
        <InfoWrapper>
            {info && (
                <GameStatesInfoSpan onAnimationEnd={onAnimationEnd}>
                    {info}
                </GameStatesInfoSpan>
            )}
        </InfoWrapper>
    );
};

export default UserAd;
