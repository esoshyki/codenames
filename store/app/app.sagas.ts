import { call, put, takeEvery } from "redux-saga/effects";
import { IAction } from "../types";
import { UserActions } from "../user/users.types";
import { setShowLogin, updateOnlineUsersRequest } from "./app.actions";
import { AppTypes } from "./app.types";
import API from '@/api';

function* setCurrentUserWorker () {
    yield put(setShowLogin(false))
};

function* setSocketIdWorker ({payload} : IAction) {
    if (payload) {
        yield put(updateOnlineUsersRequest())
    };
};

function* updateOnlineUsersRequestWorker() {
    yield call(API.updateOnlineUsers);
};

export default function* appSagas () {
    // yield takeEvery(UsersTypes.SET_CURRENT_USER, setCurrentUserWorker);
    yield takeEvery(AppTypes.SET_SOCKET_ID, setSocketIdWorker);
    yield takeEvery(AppTypes.UPDATE_ONLINE_USERS_REQUEST, updateOnlineUsersRequestWorker)
};