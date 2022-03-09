import { call, delay, put, takeEvery } from "redux-saga/effects";
import { ReduxAction } from "@/types";
import { Actions } from "@/types/actions";
import { AppStages, LayoutEffects } from "@/types/app";
import { appReset, setAppStage, setLayoutEffect } from "./app.actions";
import { clientSocket } from "@/socket/client";
import { connectionReset } from "../connection/connection.actions";
import { gameReset } from '../game/game.actions'

function* changeAppStageRequestWorker ({ payload } : ReduxAction ) {
    const appStage: AppStages = payload;
    
    yield put(setLayoutEffect(LayoutEffects.Hide));
    yield delay(600);
    yield put(setAppStage(appStage));
    yield put(setLayoutEffect(LayoutEffects.Show));
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
