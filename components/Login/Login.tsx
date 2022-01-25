import classes from './Login.module.sass';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../store/types';
import API from '../../api';
import { setLoginError, setProcessing, setUserName } from '@/store/user/users.actions';
import styled from 'styled-components';
import { setShowLogin } from '@/store/app/app.actions';

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

    const socketId = useSelector((state: IState) => state.user.user?.socketId);
    const loginError = useSelector((state: IState) => state.user.loginError);

    const submit = async () => {

        if (!socketId) {
            return;
        }

        dispatch(setProcessing(true));

        const userName = inputRef.current?.value || null;


        if (!userName) {
            return;
        }

        const loginUser = {
            userName,
            socketId
            }

        try {
            await API.login(loginUser);
            dispatch(setUserName(userName));
            dispatch(setShowLogin(false));

        } catch (err: any) {
            console.log(err.response.data);
            dispatch(setLoginError(err.response.data));
        }
        

    };

    const handleClick = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            submit();
        } 
    };

    const handleChange = () => {
        if (loginError) {
            dispatch(setLoginError(null))
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