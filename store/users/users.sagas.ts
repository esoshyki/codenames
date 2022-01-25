import { databaseService } from '@/firebase/db';
import { UsersActions } from './users.types';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { APIResponse, FireBaseResponse, ReduxAction, User } from '@/types';
import { updateServerData } from "../server/server.actions";
import API from '../../api';
import { IState, IUser } from '../types';
import { setCurrentUser, setLoginError } from './users.actions';

function* loginRequestWorker ({payload} : ReduxAction) {
    const result : APIResponse = yield call(API.login, payload);

    if (result.data) {
        yield put(setCurrentUser(payload))
    };

    if (result.error) {
        yield put(setLoginError(result.error))
    };
};

function* logoutRequestWorker ({payload} : ReduxAction) {


};

export default function* usersSaga () {

    yield takeEvery(UsersActions.LOGIN_REQUEST, loginRequestWorker);
    yield takeEvery(UsersActions.LOGOUT_REQUEST, logoutRequestWorker);  
};