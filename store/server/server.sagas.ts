import { takeEvery, put, call } from "redux-saga/effects";
import { ServerActions } from "./server.types";
import { hideLoading } from "../app/app.actions";
import { socket } from "../../socket/socket";
import { SocketClientActions } from "@/types/socket.actions";

function* disableProcessing() {
    yield put(hideLoading());
}

function* updateOnlineUsersWorker() {
    yield call(() => {
        socket.emit(SocketClientActions.UPDATE_ONLINE_USERS_REQUEST);
    });
};

function* updateServerDataRequestWorker() {
    yield call(() => {
        socket.emit(SocketClientActions.UPDATE_SERVER_DATA_REQUEST)
    })
}

export default function* serverSagas() {
    yield takeEvery(ServerActions.SET_ONLINE_USERS, disableProcessing);
    yield takeEvery(ServerActions.SET_SERVER_DATA, disableProcessing);
    yield takeEvery(ServerActions.UPDATE_ONLINE_USERS_REQUEST, updateOnlineUsersWorker);
    yield takeEvery(ServerActions.UPDATE_SERVER_DATA_REQUEST, updateServerDataRequestWorker);
}