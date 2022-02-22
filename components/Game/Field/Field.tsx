import { IField, IRound } from "@/types/game";
import { IUser } from "@/types/users";
import styled, { keyframes } from "styled-components";
import FieldGrid from "./FieldGrid";

const animation = keyframes`
    0% {
        opacity: 0
    }

    100% {
        opacity: 1
    }
`;

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    animation: ${animation} 3s linear 0s;
`;

export interface FieldProps {
    field: IField,
    round: IRound,
    currentUser: IUser
}

const Field = (props : FieldProps) => {
    return (
        <FieldWrapper>
            <FieldGrid {...props} />
        </FieldWrapper>
    );
};

export default Field;
