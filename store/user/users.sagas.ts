import { databaseService } from '@/firebase/db';
import { UserActions } from './users.types';
import { takeEvery, call, put } from 'redux-saga/effects';
import { FireBaseResponse } from '@/types';
import { updateServerData } from "../server/server.actions";
import { setProcessing } from './users.actions';

function* setSocketIdWorker () {
    const serverData : FireBaseResponse = yield call(databaseService.updateServerData);

    if (serverData.result) {
        yield put(updateServerData(serverData.result));
        yield put(setProcessing(false))
    };
};

function* setLoginErrorWorker () {
    yield put(setProcessing(false));
};

export default function* usersSaga () {
    yield takeEvery(UserActions.SET_SOCKET_ID, setSocketIdWorker);
    yield takeEvery(UserActions.SET_LOGIN_ERROR, setLoginErrorWorker);
};