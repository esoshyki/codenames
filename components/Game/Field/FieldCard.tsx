import { colors } from "@/theme/colors";
import styled from "styled-components";

const CardWrapper = styled.div<{
    selected: boolean
}>`
    position: relative;
    width: 200px;
    height: 130px;
    background-image: url(/images/card.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: center;
    transition: 0.1s ease-in;
    top: 0;
    border: ${props => props.selected ? "3px solid " + colors.green : "none"};
    border-radius: 15px;
    
    &:hover {
        cursor: pointer;
        transform: scale(1.10);
        z-index: 5;
    }
`;

const CardText = styled.span`
    font-size: 20px;
    font-weight: 700;
    color: #000;
    position: absolute;
    bottom: 27px;
    width: 100%;
    text-align: center;
    user-select: none;
`;

interface FieldCardProps {
    idx?: number;
    word?: string;
    selected: boolean,
    setSelected: () => void;
}

const FieldCard = ({ word, selected, setSelected }: FieldCardProps) => {

    return (
        <CardWrapper selected={selected} onClick={setSelected}>
            {word && <CardText>{word.toUpperCase()}</CardText>}
        </CardWrapper>
    );
};

export default FieldCard;
