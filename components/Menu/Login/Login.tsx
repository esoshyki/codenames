import { KeyboardEvent, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { select } from '@/store/select'
import styled from "styled-components";
import { colors } from "@/theme/colors";
import { setConnectionError, userLogged } from "@/store/connection/connection.actions";
import ButtonPrimary from "@/components/Layout/Buttons/Primary";

const LoginWrapper = styled.div`
    height: 50px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const InputLabel = styled.span`
    font-size: 20px;
    margin-bottom: 20px;
`

const LoginInput = styled.input`
    width: 400px;
    max-width: 400px;
    padding: 15px 15px;
    border: none;
    outline: none;
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    font-weight: 700;
    transition: 0.1s ease-in;
    &::placeholder {
        color: transparent;
    }
    &:focus {
        border-color: ${colors.yellow};
    }
`;

const LoginError = styled.span`
    color: red;
    font-weight: 700;
    font-size: 14px;
    width: 100%;
    text-align: center;
`;

const Login = () => {
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);

    const connectionError = useSelector(select.connection.connectionError);

    const submit = async () => {
        const userName = inputRef.current?.value || null;

        if (!userName) {
            return;
        }

        dispatch(userLogged(userName));
    };

    const handleClick = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            submit();
        }
    };

    const handleChange = () => {
        if (connectionError) {
            dispatch(setConnectionError(connectionError));
        }
    };

    return (
        <LoginWrapper>
            <InputLabel>Как ваше имя?</InputLabel>
            <LoginInput
                id="login-input"
                name="login"
                placeholder="Имя"
                ref={inputRef}
                onKeyPress={handleClick}
                onChange={handleChange}
            />
            {connectionError && <LoginError>{connectionError}</LoginError>}

            <ButtonPrimary onClick={submit}>ОК</ButtonPrimary>
        </LoginWrapper>
    );
};

export default Login;
