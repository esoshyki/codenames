import classes from './Login.module.sass';
import { KeyboardEvent, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../store/types';
import { useRouter } from 'next/router';
import { userLoginRequest } from '@/store/user/users.actions';

const Login = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const { user } = useSelector((state: IState) => state.user);
    const { socketId } = useSelector((state: IState) => state.app);
    const inputRef = useRef<HTMLInputElement>(null);

    const submit = async () => {
        const userName = inputRef.current?.value || null;
        if (!userName || !socketId) return;
        dispatch(userLoginRequest({ userName, socketId }));
    };

    const handleClick = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            submit();
        } 
    };

    const handleChange = () => {

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

        </div>
    )
};

export default Login