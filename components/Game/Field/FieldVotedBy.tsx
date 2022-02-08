import { colors } from "@/theme/colors";
import styled from "styled-components";

const VotedByWrapper = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 4px;
`;

const Voter = styled.span`
    font-size: 12px;
    font-weight: 900;
    color: ${colors.green};
    text-shadow: 0 0 blanchedalmond;
`;

const FieldVotedBy = ({ voters } : { voters: string[]}) => {

    return (
        <VotedByWrapper>
            {voters.map((voter) => (
                <Voter key={voter}>
                    {voter}
                </Voter>
            ))}
        </VotedByWrapper>
    )
};

export default FieldVotedBy;