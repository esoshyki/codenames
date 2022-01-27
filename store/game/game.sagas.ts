import { takeEvery, select, call } from "redux-saga/effects";
import clientSocket from "socket/socket.client";
import { IState } from "../types";
import { GameActions } from "./game.types";

function* startGameRequestWorker() {
    const state : IState = yield select();
    const currentUser = state.users.currentUser;

    if (currentUser) {
        yield call(clientSocket.startGameRequest, currentUser);
    }
}

export default function* gameSagas() {
    yield takeEvery(GameActions.START_GAME_REQUEST, startGameRequestWorker)
}
