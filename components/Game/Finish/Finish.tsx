import { changeAppStageRequest } from "@/store/app/app.actions";
import { AppStages } from "@/types/app";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const FinishWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Finish = () => {

    const dispatch = useDispatch();

    const exit = () => {
        dispatch(changeAppStageRequest(AppStages.prestart));
    }

    return (
        <FinishWrapper>
            <p>Игра завершена</p>

            <Button variant="contained" onClick={exit}>
                Выйти
            </Button>
        </FinishWrapper>
    )
};

export default Finish;