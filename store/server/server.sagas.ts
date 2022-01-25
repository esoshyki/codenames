import { takeEvery, put, call } from "redux-saga/effects";
import { ServerActions } from "./server.types";
import { hideLoading } from '../app/app.actions';
import { socket } from '../../socket/socket';
import { SocketActions } from "@/types/socket.actions";

function* disableProcessing () {
    yield put(hideLoading());
};

function* updateOnlineUsersWorker () {
    yield call(() => {
        socket.emit(SocketActions.UPDATE_ONLINE_USERS_REQUEST);
    })
}

export default function* serverSagas () {
    yield takeEvery(ServerActions.UPDATE_ONLINE_USERS, disableProcessing);
    yield takeEvery(ServerActions.UPDATE_ONLINE_USERS_REQUEST, updateOnlineUsersWorker)
};