import clientSocket from "@/socket/client";
import { IAction } from "@/types/actions";
import { IUser } from "@/types/users";
import { getCurrentUser, getGameMembers } from "@/utils/sagas";
import { call, takeEvery } from "redux-saga/effects";
import { GameActions } from "./game.types";

function* startGameRequestWorker() {
    const currentUser: IUser = yield getCurrentUser();
    yield call(clientSocket.game.startGameRequest, currentUser);
};

function* updateGameMembersRequestWorker(payload: IAction) {
    const gameMembers: IUser[] = yield getGameMembers();
    if (gameMembers.length === 0) {
        
    }
} 

export default function* gameSagas() {
    yield takeEvery(GameActions.StartGameRequest, startGameRequestWorker);
    yield takeEvery(GameActions.UpdateGameMembersRequest, updateGameMembersRequestWorker)
}
