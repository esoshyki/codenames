import clientSocket from "@/socket/client";
import { Actions, IAction } from "@/types/actions";
import { AppStages } from "@/types/app";
import { IUser } from "@/types/users";
import { getCurrentUser, getGameMembers } from "@/utils/sagas";
import { call, put, takeEvery } from "redux-saga/effects";
import { changeAppStageRequest } from "../app/app.actions";
import { setGameMembers } from "./game.actions";

function* startGameRequestWorker() {
    const currentUser: IUser = yield getCurrentUser();
    yield call(clientSocket.game.startGameRequest, currentUser);
};

function* updateGameMembersRequestWorker(action: IAction) {
    const gameMembers: IUser[] = yield getGameMembers();
    if (gameMembers.length === 0) {
        yield put(changeAppStageRequest(AppStages.prestart));
    }
    yield put(setGameMembers(action.payload));
} 

export default function* gameSagas() {
    yield takeEvery(Actions.game.StartGameRequest, startGameRequestWorker);
    yield takeEvery(Actions.game.UpdateGameMembersRequest, updateGameMembersRequestWorker)
}
