import { call, takeEvery } from "redux-saga/effects";
import { actions } from "@/types/actions";
import { socket } from "@/socket/socket.client";
import { SocketClient } from "@/socket/socket.types";
import { ReduxAction } from "@/types";

function* addMessageRequestWorker ({ payload } : ReduxAction ) {

    yield call(() => {
        socket.emit(SocketClient.ADD_MESSAGE_REQUEST, payload)
    })
};

export default function* chatSagas() {
    yield takeEvery(actions.addChatMessageRequest, addMessageRequestWorker)
}