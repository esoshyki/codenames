import { KeyboardEvent, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../store/types";
import { loginRequest, setLoginError } from "@/store/users/users.actions";
import styled from "styled-components";
import { colors } from "@/theme/colors";

const LoginWrapper = styled.span`
    height: 50px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const LoginInput = styled.input`
    width: 400px;
    max-width: 400px;
    padding: 15px 15px;
    border: none;
    outline: none;
    background-color: ${colors.blue};
    color: #fff;
    border: 1px solid #fff;
    font-weight: 700;
    transition: 0.1s ease-in;
    &::placeholder {
        color: #fff;
    }
    &:focus {
        border-color: ${colors.yellow} 
    }
`

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

    const loginError = useSelector((state: IState) => state.users.loginError);

    const submit = async () => {
        const userName = inputRef.current?.value || null;

        if (!userName) {
            return;
        }

        dispatch(loginRequest(userName));
    };

    const handleClick = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            submit();
        }
    };

    const handleChange = () => {
        if (loginError) {
            dispatch(setLoginError());
        }
    };

    return (
        <LoginWrapper>
            <LoginInput
                placeholder="Имя"
                ref={inputRef}
                onKeyPress={handleClick}
                onChange={handleChange}
            />
            {loginError && <LoginError>{loginError}</LoginError>}
        </LoginWrapper>
    );
};

export default Login;
