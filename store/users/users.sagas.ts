import { UsersActions } from './users.types';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { APIResponse, ReduxAction, User } from '@/types';
import API from '../../api';
import { setCurrentUser, setLoginError } from './users.actions';
import { hideLoginComponent } from '../app/app.actions';
import { socket } from '../../socket/socket'
import { IState } from '../types';
import { SocketActions } from '@/types/socket.actions';

function* loginRequestWorker ({payload} : ReduxAction) {

    const state: IState = yield select();
    const socketId = state.app.socketId;

    yield call(() => {
        socket.emit(SocketActions.LOGIN, ({
            userName: payload,
            socketId
        }))
    });
    yield put(setCurrentUser({userName: payload}));
    yield put(hideLoginComponent());

};

function* logoutRequestWorker ({payload} : ReduxAction) {

    const state: IState = yield select();
    const socketId = state.app.socketId;

    yield call(() => {
        socket.emit(SocketActions.LOGOUT, ({
            userName: payload,
            socketId
        }))
    });

    yield put(setCurrentUser(null));

};

export default function* usersSaga () {

    yield takeEvery(UsersActions.LOGIN_REQUEST, loginRequestWorker);
    yield takeEvery(UsersActions.LOGOUT_REQUEST, logoutRequestWorker);  
};