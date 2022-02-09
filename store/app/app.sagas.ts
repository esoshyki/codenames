import { takeEvery } from "redux-saga/effects";
import { ReduxAction } from "@/types";
import { actions } from "@/types/actions";

function* setSocketIdWorker () {

};

function* changeAppStageQuery({ payload } : ReduxAction ) {

};


export default function* appSagas() {
    yield takeEvery(actions.setSocketId, setSocketIdWorker);
};
