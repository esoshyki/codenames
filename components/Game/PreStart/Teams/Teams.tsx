import styled from "styled-components";
import Team from "./Team";
import { Sides } from "@/store/game/game.types";
import { colors } from "@/theme/colors";
import { useDispatch } from "react-redux";
import { setLeaderRequest } from "@/store/game/game.actions";

const TeamsWrapper = styled.div`
    max-width: 1000px;
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    flex-wrap: wrap;
`

const MakeMeLeaderButton = styled.button`
    width: calc(100% - 40px);
    margin: 20px;
    padding: 20px;
    background: none;
    border-radius: 20px;
    border: 1px solid ${colors.green};
    color: ${colors.green};
    transition: 0.3s ease-in;
    &:hover {
        cursor: pointer;
        background: rgba(0, 0, 0, 0.3);
    }
`;



const Teams = () => {

    const dispatch = useDispatch();

    const makeMeALeader = () => {
        dispatch(setLeaderRequest())
    };

    return (
        <TeamsWrapper>
            <Team team={Sides.red} />
            <Team team={Sides.blue} />
            <MakeMeLeaderButton
                onClick={makeMeALeader}
                >Make me leader</MakeMeLeaderButton>
        </TeamsWrapper>
    )
};

export default Teams;