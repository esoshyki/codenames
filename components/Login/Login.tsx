import classes from './Login.module.sass';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../store/types';
import API from '../../api';
import { loginRequest, setLoginError } from '@/store/users/users.actions';
import styled from 'styled-components';
import { showLoading, hideLoading } from '@/store/app/app.actions';


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

        dispatch(showLoading());

        const userName = inputRef.current?.value || null;


        if (!userName) {
            return;
        }

        try {
            dispatch(loginRequest({
                userName
            }))

        } catch (err: any) {

            dispatch(setLoginError(err.response.data));
        }
        
        dispatch(hideLoading())

    };

    const handleClick = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            submit();
        } 
    };

    const handleChange = () => {
        if (loginError) {
            dispatch(setLoginError())
        }
    };


    return (
        <div className={classes.login}>
            <input 
                className={classes.login__input}
                placeholder='Имя' 
                ref={inputRef} 
                onKeyPress={handleClick}
                onChange={handleChange}
                />
            {loginError && <LoginError>{loginError}</LoginError>}
        </div>
    )
};

export default Login