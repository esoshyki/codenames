import styled, { keyframes } from "styled-components";
import FieldGrid from "./FieldGrid";
import FieldSettings from "./FieldSetting";

const animation = keyframes`
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
`

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    animation: ${animation} 3s linear 0s;
`

const Field = () => {

    return (
        <FieldWrapper>
            <FieldSettings></FieldSettings>
            <FieldGrid />
        </FieldWrapper>
    )
};

export default Field;