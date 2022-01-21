import { UsersTypes } from "./users.types";
import API from '@/api/service';
import { IUser } from "../types";
import { takeEvery, put, call } from "redux-saga/effects";
import { IAction } from "../types";
import { setCurrentUser } from "./users.actions";
import { setShowLogin } from "../app/app.actions";

const connect = async (user: IUser) : Promise<IUser> => {
    const result = await API.connect(user);
    return result;
};

const disconnect = async (user: IUser) : Promise<IUser> => {
    const result = await API.logUserOut(user);
    return result;
};

function* connectWorker ({payload} : IAction) {
    const user : IUser = yield call(connect, payload);
    yield put(setCurrentUser(user));
};

function* setCurrentUserWorker () {
    yield call(API.updateOnlineUsers)
};

function* disconnectWorker ({payload} : IAction) {
    yield call(disconnect, payload)
};

function* setOnlineUsersWorker () {
    yield put(setShowLogin(false))
};

export default function* usersSaga () {
    yield takeEvery(UsersTypes.CONNECT, connectWorker);
    yield takeEvery(UsersTypes.DISCONNECT_REQUEST, disconnectWorker);
    yield takeEvery(UsersTypes.SET_CURRENT_USER, setCurrentUserWorker);
    yield takeEvery(UsersTypes.SET_ONLINE_USERS, setOnlineUsersWorker);
};