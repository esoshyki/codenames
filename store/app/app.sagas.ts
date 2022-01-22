import { call, put, takeEvery } from "redux-saga/effects";
import { IAction } from "../types";
import { UsersTypes } from "../user/users.types";
import { setShowLogin, updateOnlineUsersRequest } from "./app.actions";
import { AppTypes } from "./app.types";
import API from '@/api/service';

function* setCurrentUserWorker () {
    yield put(setShowLogin(false))
};

function* setConnectionStatusWorker ({payload} : IAction) {
    if (payload) {
        yield put(updateOnlineUsersRequest())
    };
};

function* updateOnlineUsersRequestWorker() {
    yield call(API.updateOnlineUsers);
};

export default function* appSagas () {
    yield takeEvery(UsersTypes.SET_CURRENT_USER, setCurrentUserWorker);
    yield takeEvery(AppTypes.SET_CONNECTED_STATUS, setConnectionStatusWorker);
    yield takeEvery(AppTypes.UPDATE_ONLINE_USERS_REQUEST, updateOnlineUsersRequestWorker)
};