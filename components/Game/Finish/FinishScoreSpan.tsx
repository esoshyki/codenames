import styled from "styled-components";

export const FinishScoreSpan = styled.span<{
    red: boolean
}>`
    color: ${props => props.red ? "red" : "blue"};
    margin: 0 30px;
`;