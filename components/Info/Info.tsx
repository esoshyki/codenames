import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "@/store/types";
import { hideUserConnectedAd, hideUserDisconnectedAd } from "@/store/app/app.actions";

const UserAd = () => {

    const dispatch = useDispatch();

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
    `

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

    const InfoItemTargetSpan = styled.span<{connected: boolean}>`
        font-size: 25px;
        color: ${props => props.connected ? "green" : "red"};
    `;

    const { userConnectedAd, userDisconnectedAd }= useSelector((state: IState) => state.app);
    
    return (
        <InfoWrapper>
            {userConnectedAd && (
                <InfoItemTemp 
                    onAnimationEnd={() => dispatch(hideUserConnectedAd())}
                    >
                    <span>User </span>
                    <InfoItemTargetSpan
                        connected={true}
                        >{userConnectedAd}</InfoItemTargetSpan>
                    <span> connected </span>
                </InfoItemTemp>
            )}

            {userDisconnectedAd && (
                <InfoItemTemp 
                    onAnimationEnd={() => dispatch(hideUserDisconnectedAd())}
                    >
                    <span>User </span>
                    <InfoItemTargetSpan
                        connected={false}
                    >
                        {userDisconnectedAd}
                    </InfoItemTargetSpan>
                    <span> disconnected </span>
                </InfoItemTemp>
            )}
        </InfoWrapper>
    )
};

export default UserAd;