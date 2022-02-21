import styled from "styled-components";
import { useSelector } from "react-redux";
import { IState } from "@/types";
import PreStartGameMember from "./PreStartGameMember";
import { IUser } from "@/types/users";
import t from "@/t";
import { select } from "@/store/select";
import { PrestartContent } from "translate/prestart";

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

    const locale = useSelector(select.app.locale);


    return (
        <PreStartGameMembersWrapper>

            <PreStartTitle>
                {t.preStart(locale, PrestartContent.gameMembers)}
            </PreStartTitle>

            <MembersContainer>
                {gameMembers && gameMembers.map((gameMember : IUser, idx: number) => (
                    <PreStartGameMember key={idx} user={gameMember}/>
                ))}
            </MembersContainer>
            
        </PreStartGameMembersWrapper>
    )

};

export default PreStartGameMembers;