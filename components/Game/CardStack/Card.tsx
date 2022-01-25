import { cardType } from "@/store/types";
import styled from "styled-components";

interface CardProps {
    type: cardType;
    offsetX: number;
    offsetY: number;
}

const CardWrapper = styled.div<{
    backgroundImage: string;
    offsetX: number;
    offsetY: number;
}>`
    position: absolute;
    background-image: ${(props) => props.backgroundImage};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    top: ${(props) => props.offsetY};
    left: ${(props) => props.offsetX};
`;

const Card = ({ type, offsetX, offsetY }: CardProps) => {
    const choseBg = () => {
        switch (type) {
            case cardType.red:
                return "url(/images/red_card.jpg)";
            case cardType.blue:
                return "url(/images/blue_card.jpg)";
            case cardType.white:
                return "url(/images/white_card.jpeg)";

            default:
                return "none";
        }
    };

    return (
        <CardWrapper
            offsetX={offsetX}
            offsetY={offsetY}
            backgroundImage={choseBg()}
        />
    );
};

export default Card;
