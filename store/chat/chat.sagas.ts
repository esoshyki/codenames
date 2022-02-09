import { call, takeEvery } from "redux-saga/effects";
import { actions } from "@/types/actions";
import { socket } from "@/socket/client";
import { SClient } from "@/socket/socket.types";
import { ReduxAction } from "@/types";

function* addMessageRequestWorker ({ payload } : ReduxAction ) {

};

export default function* chatSagas() {
    yield takeEvery(actions.addChatMessageRequest, addMessageRequestWorker)
}