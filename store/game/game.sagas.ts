import clientSocket from "@/socket/client";
import { Actions, IAction } from "@/types/actions";
import { AppStages } from "@/types/app";
import { Sides } from "@/types/game";
import { IUser } from "@/types/users";
import { getCurrentUser, getGameMembers } from "@/utils/sagas";
import { call, put, takeEvery } from "redux-saga/effects";
import { changeAppStageRequest } from "../app/app.actions";
import { setCurrentUserTeam } from "../connection/connection.actions";
import { setBlueTeam, setGameMembers, setRedTeam } from "./game.actions";

function* startGameRequestWorker() {
    const currentUser: IUser = yield getCurrentUser();
    yield call(clientSocket.game.startGameRequest, currentUser);
};

function* updateGameMembersRequestWorker(action: IAction) {
    const gameMembers: IUser[] = yield getGameMembers();
    if (gameMembers.length === 0) {
        yield put(changeAppStageRequest(AppStages.prestart));
    };
    const newMembers : IUser[] = action.payload;
    const redTeam = newMembers.filter(user => user.team === Sides.red);
    const blueTeam = newMembers.filter(user => user.team === Sides.blue);
    yield put(setGameMembers(newMembers));
    yield put(setRedTeam(redTeam));
    yield put(setBlueTeam(blueTeam));
};

function* toggleTeamRequestWorker(action: IAction) {

    const currentUser: IUser = yield getCurrentUser();
    const side = currentUser.team === action.payload ? undefined : action.payload
    yield call(clientSocket.game.updateGameMember, {
        ...currentUser,
        team: side  
    });
    yield put(setCurrentUserTeam(side));
};

export default function* gameSagas() {
    yield takeEvery(Actions.game.StartGameRequest, startGameRequestWorker);
    yield takeEvery(Actions.game.UpdateGameMembersRequest, updateGameMembersRequestWorker);
    yield takeEvery(Actions.game.ToggleTeamRequest, toggleTeamRequestWorker);
}
