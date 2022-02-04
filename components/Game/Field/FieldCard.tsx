import styled from "styled-components";
import FieldVotedBy from "./FieldVotedBy";

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
    filter: ${props => props.selected ? "hue-rotate(60deg)" : "none"};
    border-radius: 15px;
    
    &:hover {
        cursor: pointer;
        filter: grayscale(1);
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
    votedBy: string[] | null
}

const FieldCard = ({ word, selected, setSelected, votedBy }: FieldCardProps) => {

    return (
        <CardWrapper selected={selected} onClick={setSelected}>
            {word && <CardText>{word.toUpperCase()}</CardText>}
            {votedBy && <FieldVotedBy voters={votedBy}/>}
        </CardWrapper>
    );
};

export default FieldCard;
