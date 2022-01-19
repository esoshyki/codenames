import classes from './Login.module.sass';
import { KeyboardEvent, MouseEvent, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearLoginError, createLoginError } from '../../store/user/user.actions';
import { IState } from '../../store/types';
import { errors } from '../../store/errors';
import { useRouter } from 'next/router';

const Login = () => {

    const router = useRouter();

    const dispatch = useDispatch();
    const { user, loginError } = useSelector((state: IState) => state.user);
    const { users } = useSelector((state: IState) => state.chat)

    const inputRef = useRef<HTMLInputElement>(null);

    const submit = () => {

        const userName = inputRef.current?.value || null;

        if (!userName) return;

        if (users.some(user => user.userName === userName)) {
            dispatch(createLoginError(errors.login.userExists))
        } else {
            dispatch(login({userName}))
        }

    };

    const handleClick = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            submit();
        } 
    };

    const handleChange = () => {
        if (loginError) {
            dispatch(clearLoginError())
        }
    };

    useEffect(() => {
        if (user) {
            router.push("/")
        };
    }, [user])

    return (
        <div className={classes.login}>
            <input 
                className={classes.login__input}
                placeholder='Имя' 
                ref={inputRef} 
                onKeyPress={handleClick}
                onChange={handleChange}
                />

            {loginError && (
                <span className={classes.login__error}>
                    {loginError}
                </span>
            )}

        </div>
    )
};

export default Login