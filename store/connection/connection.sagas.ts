import { takeEvery } from "redux-saga/effects";
import { Actions } from "@/types/actions";

function* socketConnectedWorker() {

};

function* socketDisconnectedWorker() {

};

function* userLoggedWorker() {

};

export default function* connectionSagas() {
    yield takeEvery(Actions.connection.socketConnected, socketConnectedWorker);
    yield takeEvery(Actions.connection.socketDisconnected, socketDisconnectedWorker);
    yield takeEvery(Actions.connection.userLogged, userLoggedWorker)
};


