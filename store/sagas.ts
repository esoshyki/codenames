import { all } from 'redux-saga/effects';
import appSagas from './app/app.sagas';
import usersSaga from './user/users.sagas';

export default function* () {
    yield all([
        usersSaga(),
        appSagas()
    ]);
};

