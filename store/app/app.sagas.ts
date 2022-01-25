import { AppActions } from "./app.types";
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { ReduxAction } from "@/types";

function* changeSocketIdRequest ({payload}: ReduxAction) {
    
}   

export default function* appSagas () {
    yield takeEvery(AppActions.CHANGE_SOCKET_ID_REQUEST, changeSocketIdRequest)
};