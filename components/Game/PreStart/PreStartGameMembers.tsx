import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "@/store/types";
import PreStartGameMember from "./PreStartGameMember";

const PreStartGameMembersWrapper = styled.div`
    position: absolute;
    left: 0;
`

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

            {gameMembers && gameMembers.map((gameMember,idx) => (
                <PreStartGameMember key={idx} user={gameMember}/>
            ))}
        </PreStartGameMembersWrapper>
    )

};

export default PreStartGameMembers;