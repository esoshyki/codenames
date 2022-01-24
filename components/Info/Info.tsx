import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "@/store/types";
import {
    hideUserConnectedAd,
    hideUserDisconnectedAd
} from "@/store/app/app.actions";

const kframes = keyframes`
0% {
    opacity: 0
}

50% {
    opacity: 1
}

100% {
    opacity: 0
}
`;

const InfoWrapper = styled.div`
    position: fixed;
    top: 0;
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const InfoItemTemp = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 800;
    opacity: 1;
    animation: ${kframes} 1s ease-in 0s;
`;

const InfoItemTargetSpan = styled.span<{ connected: boolean }>`
    font-size: 25px;
    color: ${(props) => (props.connected ? "green" : "red")};
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
`

const GameStatesInfoSpan = styled.span`
    font-size: 25px;
    font-weight: 700;
    text-align: justify;
    animation: ${GameStateInfoAnimation} 3s linear 0s infinite;
`

const UserAd = () => {
    const dispatch = useDispatch();

    const { userConnectedAd, userDisconnectedAd } = useSelector(
        (state: IState) => state.app
    );

    const members = useSelector((state: IState) => state.game.members);

    return (
        <InfoWrapper>
            {userConnectedAd && (
                <InfoItemTemp
                    onAnimationEnd={() => dispatch(hideUserConnectedAd())}
                >
                    <span>User </span>
                    <InfoItemTargetSpan connected={true}>
                        {userConnectedAd}
                    </InfoItemTargetSpan>
                    <span> connected </span>
                </InfoItemTemp>
            )}

            {userDisconnectedAd && (
                <InfoItemTemp
                    onAnimationEnd={() => dispatch(hideUserDisconnectedAd())}
                >
                    <span>User </span>
                    <InfoItemTargetSpan connected={false}>
                        {userDisconnectedAd}
                    </InfoItemTargetSpan>
                    <span> disconnected </span>
                </InfoItemTemp>
            )}

            {members?.length < 4 && (
                <GameStatesInfoSpan>
                    Вы можете начать игру, как только будут готовы хотя бы 4 игрока
                </GameStatesInfoSpan>
            )}

        </InfoWrapper>
    );
};

export default UserAd;
