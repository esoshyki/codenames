import classes from './Login.module.sass';
import { KeyboardEvent, MouseEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../store/user/user.actions';
import { IState } from '../../store/types';

const Login = () => {

    const dispatch = useDispatch();
    const users = useSelector((state: IState) => state.user.users);

    const inputRef = useRef<HTMLInputElement>(null);

    const submit = () => {

        const userName = inputRef.current?.value || null;

        if (userName) {
            dispatch(createUser(userName, users.length))
        }
    };

    const handleClick = (e: KeyboardEvent) => {
        console.log(e.key)
    };

    return (
        <div className={classes.login}>
            <input 
                placeholder='Имя' 
                ref={inputRef} 
                onKeyPress={handleClick}
                />
        </div>
    )
};

export default Login