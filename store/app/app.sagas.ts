import { call, put, takeEvery } from "redux-saga/effects";
import { ReduxAction } from "@/types";
import { Actions } from "@/types/actions";
import { AppStages } from "@/types/app";
import { appReset, setAppStage } from "./app.actions";
import clientSocket from "@/socket/client";
import { connectionReset } from "../connection/connection.actions";
import { gameReset } from '../game/game.actions'

const actions = Actions.app;

function* setSocketIdWorker () {

};

function* changeAppStageRequestWorker ({ payload } : ReduxAction ) {
    const appStage: AppStages = payload;

    yield put(setAppStage(appStage));
};

function* restartRequestWorker() {
    yield call(clientSocket.app.resetServerData);
};

function* restartWorker() {
    yield put(appReset());
    yield put(connectionReset());
    yield put(gameReset());
}


export default function* appSagas() {
    yield takeEvery(Actions.app.ChangeAppStageRequest, changeAppStageRequestWorker);
    yield takeEvery(Actions.app.RestartRequest, restartRequestWorker);
    yield takeEvery(Actions.app.Restart, restartWorker)
};
