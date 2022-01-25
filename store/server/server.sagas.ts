import { takeEvery, put } from "redux-saga/effects";
import { ServerActions } from "./server.types";


function* disableProcessing () {
    console.log("Disable provess");
    yield put(setProcessing(false));
};

export default function* serverSagas () {
    yield takeEvery(ServerActions.UPDATE_ONLINE_USERS, disableProcessing)
};