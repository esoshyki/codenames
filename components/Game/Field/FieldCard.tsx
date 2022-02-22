import { select } from "@/store/select";
import { Neutrals, Sides } from "@/types/game";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { WinnerVoteAnimation } from "@/styles/animations";

const CardWrapper = styled.div<{
    selected: boolean,
    winner: boolean
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
    animation: ${props => props.winner && css`${WinnerVoteAnimation} 0.8s linear 0s infinite`};
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

const CardVotes = styled.span`
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
`

const CoveredCard = styled.div<{type: Sides | Neutrals}>`
    position: absolute;
    left: 0;
    top: 0%;
    width: 100%;
    height: 100%;
    z-index: 5000;
    transition: opacity 0.3s ease-in;
    background-size: cover;
    border-radius: 15px;
    background-image: ${props => {
        switch (props.type) {
            case Sides.blue:
                return "url(/images/blue_card.jpg)";
            case Sides.red:
                return "url(/images/red_card.jpg)";
            case Neutrals.white:
                return "url(/images/white_card.jpeg)";
            case Neutrals.black:
                return "url(/images/black_card.jpeg)";
            default:
                return "url(/images/black_card.jpeg)";              
        }
    }};
    &:hover {
        opacity: 0.1;
    }
`;

interface FieldCardProps {
    idx?: number;
    word?: string;
    selected: boolean,
    setSelected: () => void;
    votes: number,
    covered: boolean;
    type: Sides | Neutrals,
    id: number;
}

const FieldCard = ({ word, selected, setSelected, votes, covered, type, id }: FieldCardProps) => {

    const winnerVote = useSelector(select.game.winnerVote);

    return (
        <CardWrapper 
            selected={selected} 
            onClick={setSelected}
            winner={winnerVote === id}
            >
            {word && <CardText>{word.toUpperCase()}</CardText>}
            {votes > 0 && <CardVotes>{votes}</CardVotes>}
            {covered && <CoveredCard type={type}/>}
        </CardWrapper>
    );
};

export default FieldCard;
