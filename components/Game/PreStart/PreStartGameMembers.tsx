import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import PreStartGameMember from "./PreStartGameMember";

const PreStartGameMembersWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const MembersContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PreStartTitle = styled.h5`
    font-size: 22px;
    margin: 20px;
`

const PreStartGameMembers = () => {

    const gameMembers = useSelector((state: IState) => state.game.gameMembers);


    return (
        <PreStartGameMembersWrapper>

            <PreStartTitle>
                Game members
            </PreStartTitle>

            <MembersContainer>
                {gameMembers && gameMembers.map((gameMember,idx) => (
                    <PreStartGameMember key={idx} user={gameMember}/>
                ))}
            </MembersContainer>
            
        </PreStartGameMembersWrapper>
    )

};

export default PreStartGameMembers;