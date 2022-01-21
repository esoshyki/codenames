import { all } from 'redux-saga/effects';
import usersSaga from './user/users.sagas';

export default function* () {
    yield all([
        usersSaga(),
    ]);
};

