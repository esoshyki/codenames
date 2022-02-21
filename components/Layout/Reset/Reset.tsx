import { appRestartRequest } from "@/store/app/app.actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ResetButton = styled.button`
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px;
    z-index: 50000;
`;

const Reset = () => {

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(appRestartRequest())
    }

    return <ResetButton onClick={onClick}>Reset</ResetButton>
};

export default Reset;