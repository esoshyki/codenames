import { UsersTypes } from "./users.types";
import API from '@/api/service';
import { IUser } from "../types";
import { takeEvery, put, call, fork } from "redux-saga/effects";
import { IAction } from "../types";
import { setCurrentUser } from "./users.actions";

const connect = async (user: IUser) : Promise<IUser> => {
    const result = await API.connect(user);
    return result;
};

function* disconnectWorker ({payload} : IAction) {
    yield call(API.connect, payload)
};

function* loginRequestWorker (action: IAction) {
    yield fork(connect, action.payload);
    yield put(setCurrentUser(action.payload));
};

function* logoutRequestWorker (action: IAction) {
    yield call(API.disconnect, action.payload);
    yield put(setCurrentUser(null));
}

export default function* usersSaga () {
    yield takeEvery(UsersTypes.USER_LOGIN_REQUEST, loginRequestWorker);
    yield takeEvery(UsersTypes.DISCONNECT_REQUEST, disconnectWorker);
    yield takeEvery(UsersTypes.USER_LOGOUT_REQUEST, logoutRequestWorker);
};