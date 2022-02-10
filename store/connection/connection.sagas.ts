import { takeEvery, call, put, select } from "redux-saga/effects";
import { Actions, IAction } from "@/types/actions";
import clientSocket from "@/socket/client";
import { setSocketId, setUserName } from "./connection.actions";
import { IState } from "@/types";

function* socketConnectedWorker({ payload } : IAction) {
    yield call(clientSocket.connection.setSocketIdRequest, ({ socketId: payload }));
    yield put(setSocketId(payload));
};

function* socketDisconnectedWorker() {

};

function* userLoggedWorker({ payload } : IAction) {
    const userName = payload;
    const state : IState = yield select();
    const currentUser = state.connection.currentUser;

    console.log(currentUser);

    yield call(clientSocket.connection.setUserNameRequest, {
        ...currentUser,
        userName
    });

    yield put(setUserName(userName));
};

export default function* connectionSagas() {
    yield takeEvery(Actions.connection.socketConnected, socketConnectedWorker);
    yield takeEvery(Actions.connection.socketDisconnected, socketDisconnectedWorker);
    yield takeEvery(Actions.connection.userLogged, userLoggedWorker)
};


