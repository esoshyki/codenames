import styled from "styled-components";
import Team from "./Team";

const TeamsWrapper = styled.div`
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
`

const Teams = () => {

    return (
        <TeamsWrapper>
            <Team team="red" />
            <Team team="blue" />
        </TeamsWrapper>
    )
};

export default Teams;