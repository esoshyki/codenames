import { IState } from "../../store/types";
import ReadyUser from "./ReadyUser";
import { Fragment } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UsersWrappers = styled.div`
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ReadyUsers = () => {
    const { members } = useSelector((state: IState) => state.game);

    return (
        <Wrapper>
            <h5>Ready users</h5>

            <UsersWrappers>
                {members &&
                    members.map((member, idx) => (
                        <Fragment key={idx}>
                            <ReadyUser user={member} />
                        </Fragment>
                    ))}
            </UsersWrappers>
        </Wrapper>
    );
};

export default ReadyUsers;
