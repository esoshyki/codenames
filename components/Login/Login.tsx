import classes from './Login.module.sass';
import { KeyboardEvent, MouseEvent, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../store/types';
import { useRouter } from 'next/router';
import { userConnect } from '@/store/user/users.actions';


const Login = () => {

    const router = useRouter();

    const dispatch = useDispatch();

    const { user, loginError } = useSelector((state: IState) => state.user);

    const inputRef = useRef<HTMLInputElement>(null);

    const submit = async () => {

        const userName = inputRef.current?.value || null;

        if (!userName) return;

        dispatch(userConnect({ userName }));

    };

    const handleClick = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            submit();
        } 
    };

    const handleChange = () => {
        if (loginError) {
            // dispatch(clearLoginError())
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