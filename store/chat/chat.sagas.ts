import { call, takeEvery } from "redux-saga/effects";
import { Actions } from "@/types/actions";
import { ReduxAction } from "@/types";

const actions = Actions.chat;

function* addMessageRequestWorker ({ payload } : ReduxAction ) {

};

export default function* chatSagas() {
    yield takeEvery(actions.addChatMessageRequest, addMessageRequestWorker)
}