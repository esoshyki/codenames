import { AppActions } from "./app.types";
import { call, select, takeEvery } from "redux-saga/effects";
import { ReduxAction } from "@/types";
import { IState } from "../types";
import clientSocket from "@/socket/socket.client";

function* changeSocketIdRequest() {}

function* customCardVoteRequestWorker({payload} : ReduxAction) {
    const cardId : number = payload;
    const state: IState = yield select();
    const currentUser = state.users.currentUser;
    console.log(currentUser);
    if (cardId && currentUser) {
        yield call(clientSocket.makeCustomVoteRequest, cardId, currentUser)
    };
}

export default function* appSagas() {
    yield takeEvery(AppActions.CHANGE_SOCKET_ID_REQUEST, changeSocketIdRequest);
    yield takeEvery(AppActions.CUSTOM_CARD_VOTE_REQUEST, customCardVoteRequestWorker);
}
