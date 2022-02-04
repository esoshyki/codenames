import { colors } from "@/theme/colors";
import styled from "styled-components";

const VotedByWrappter = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
`;

const Voter = styled.span`
    font-size: 10px;
    font-weight: 900;
    color: ${colors.green};
`;

const FieldVotedBy = ({ voters } : { voters: string[]}) => {

    return (
        <VotedByWrappter>
            {voters.map((voter) => (
                <Voter key={voter}>
                    {voter}
                </Voter>
            ))}
        </VotedByWrappter>
    )
};

export default FieldVotedBy;