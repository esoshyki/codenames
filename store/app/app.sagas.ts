import { AppActions } from "./app.types";
import { takeEvery } from 'redux-saga/effects';

function* changeSocketIdRequest () {
    
}   

export default function* appSagas () {
    yield takeEvery(AppActions.CHANGE_SOCKET_ID_REQUEST, changeSocketIdRequest)
};