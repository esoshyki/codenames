import { takeEvery } from "redux-saga/effects";
import { ReduxAction } from "@/types";
import { actions } from "@/types/actions";

function* updateOnlineUsersRequestWorker () {

};

function* changeAppStageQuery({ payload } : ReduxAction ) {

};


export default function* appSagas() {
    yield takeEvery(actions.updateOnlineUsersRequest, updateOnlineUsersRequestWorker);
    yield takeEvery(actions.changeAppStageQuery, changeAppStageQuery)
};
