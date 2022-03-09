import { call, delay, put, takeEvery } from "redux-saga/effects";
import { Actions, IAction } from "@/types/actions";
import { clientSocket } from "@/socket/client";
import { getCurrentUser } from "@/utils/sagas";
import { IUser } from "@/types/users";
import { addMessage, removeMessage } from "./chat.actions";
import { IMessage } from "@/types/chat";
import { v4 as uuidv4 } from 'uuid';

const actions = Actions.chat;

function* addMessageRequestWorker ({ payload } : IAction ) {
    const currentUser: IUser | undefined = yield getCurrentUser();
    const message: IMessage = payload;

    if (currentUser?.userName) {
        yield call(clientSocket.app.sendMessage, message)
    }
}

function* messageResponseWorker ({payload} : IAction) {
    console.log("saga response message", payload);
    const id = uuidv4();
    yield put(addMessage({
        ...payload,
        id
    }));
    yield delay(4000);
    yield put(removeMessage(id))
}

export default function* chatSagas() {
    yield takeEvery(actions.addChatMessageRequest, addMessageRequestWorker);
    yield takeEvery(actions.addChatMessageResponse, messageResponseWorker)
}