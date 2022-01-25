import styled, { keyframes } from "styled-components/";
import { GuesserTypes } from "./types";
import { useRef } from "react";

const animation = keyframes`
    from {
        width: 0;
        height: 0;
    }

    to {
        width: 26px;
        height: 26px;
    }
`;

const GuessItemWrapper = styled.div`
    position: absolute;
    width: 0;
    height: 0;
    animation-name: ${animation};
    animation-duration: 300ms;
    animation-timing-function: ease-in;
`;

interface GuessItemProps {
    type: string;
    idx: number;
}

const GuessItem = ({ type, idx }: GuessItemProps) => {
    const getImage = () => {
        switch (type) {
            case GuesserTypes.white:
                return `url(/images/White.png)`;
            case GuesserTypes.blue:
                return `url(/images/Blue.png)`;
            case GuesserTypes.red:
                return `url(/images/Red.png)`;
            case GuesserTypes.black:
                return `url(/images/Black.png)`;
            default:
                return `none`;
        }
    };

    const getPosition = (): { x: number; y: number } => {
        const baseLeft = 39;
        const baseTop = 39;

        const leftCounter = idx % 5;
        const topCounter = Math.floor(idx / 5);

        return {
            x: baseLeft + leftCounter * 28.5,
            y: baseTop + topCounter * 28.5
        };
    };

    const itemRef = useRef<HTMLDivElement>(null);

    const handleAnimationEnd = () => {
        if (itemRef.current) {
            itemRef.current.style.width = "26px";
            itemRef.current.style.height = "26px";
        }
    };

    return (
        <GuessItemWrapper
            onAnimationEnd={handleAnimationEnd}
            ref={itemRef}
            style={{
                backgroundImage: getImage(),
                left: getPosition().x,
                top: getPosition().y,
                animationDelay: `${200 * idx}ms`
            }}
        ></GuessItemWrapper>
    );
};

export default GuessItem;
