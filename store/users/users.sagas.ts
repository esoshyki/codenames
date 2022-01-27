import { UsersActions } from "./users.types";
import { takeEvery, call, put, select } from "redux-saga/effects";
import { ReduxAction } from "@/types";
import { setCurrentUser, setLoginError } from "./users.actions";
import { hideLoginComponent } from "../app/app.actions";
import { socket } from "../../socket/socket.client";
import { IState } from "../types";
import { SocketClientActions } from "@/socket/socket.types";

function* loginRequestWorker({ payload }: ReduxAction) {
    const state: IState = yield select();
    const socketId = state.app.socketId;
    const onlineUsers = state.server.onlineUsers;

    if (onlineUsers.find(us => us.userName === payload)) {
        yield put(setLoginError("User exists"));
    } else {
        yield call(() => {
            socket.emit(SocketClientActions.LOGIN_REQUEST, {
                userName: payload,
                socketId
            });
        });
        yield put(setCurrentUser({ userName: payload }));
        yield put(hideLoginComponent());
    }
}

function* logoutRequestWorker({ payload }: ReduxAction) {
    const state: IState = yield select();
    const socketId = state.app.socketId;

    yield call(() => {
        socket.emit(SocketClientActions.LOGOUT_REQUEST, {
            userName: payload,
            socketId
        });
    });

    yield put(setCurrentUser(null));
}

export default function* usersSaga() {
    yield takeEvery(UsersActions.LOGIN_REQUEST, loginRequestWorker);
    yield takeEvery(UsersActions.LOGOUT_REQUEST, logoutRequestWorker);
}
