import styled from 'styled-components';

const CardWrapper = styled.div`
    position: relative;
    width: 200px;
    height: 130px;
    background-image: url(/images/card.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: center;
    transition: 0.1s ease-in;
    top: 0px;
    &:hover {
        cursor: pointer;
        top: 2px;
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
`

interface FieldCardProps {
    idx?: number;
    word?: string;
}

const FieldCard = ({
    word
} : FieldCardProps) => {

    return (
        <CardWrapper>
            {word && <CardText>{word.toUpperCase()}</CardText>}
        </CardWrapper>
    )
};

export default FieldCard;