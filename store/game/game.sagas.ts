import { ReduxAction } from "@/types";
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
};

function* setTeamRequestWorker ({payload} : ReduxAction) {
    const state : IState = yield select();
    const currentUser = state.users.currentUser;

    if (currentUser) {
        yield call(clientSocket.setTeamRequest, currentUser, payload)
    }
};

function* setLeaderRequestWorker() {
    const state: IState = yield select();
    const currentUser = state.users.currentUser;

    if (currentUser) {
        yield call(clientSocket.setLeaderRequest, currentUser)
    }

};

export default function* gameSagas() {
    yield takeEvery(GameActions.START_GAME_REQUEST, startGameRequestWorker);
    yield takeEvery(GameActions.SET_TEAM_REQUEST, setTeamRequestWorker);
    yield takeEvery(GameActions.SET_LEADER_REQUEST, setLeaderRequestWorker)
}
