import { ReduxAction } from "@/types";
import { takeEvery, select, call, takeLatest, put } from "redux-saga/effects";
import clientSocket from "socket/socket.client";
import { IState } from "../types";
import { setGameStage } from "./game.actions";
import { GameActions, GameStages, Sides } from "./game.types";
import { teamsAreComplete, allReady, teamHasLeaders } from '@/utils/teams';

function* startGameRequestWorker() {
    const state : IState = yield select();
    const currentUser = state.users.currentUser;

    if (currentUser) {
        yield call(clientSocket.startGameRequest, currentUser);
    }
};

function* setTeamRequestWorker ({payload} : ReduxAction) {
    const state : IState = yield select();
    const currentUser = state.users.currentUser;

    if (currentUser) {
        yield call(clientSocket.setTeamRequest, currentUser, payload)
    }
};

function* setLeaderRequestWorker() {
    const state: IState = yield select();
    const currentUser = state.users.currentUser;

    if (currentUser) {
        yield call(clientSocket.setLeaderRequest, currentUser);
    }
};

function* toggleReadyRequest() {
    const state: IState = yield select();
    const currentUser = state.users.currentUser;

    if (currentUser) {
        yield call(clientSocket.toggleReadyRequest, currentUser.userName);
    };
};

function* collectionVoteRequestWorker ({payload} : ReduxAction) {
    const state: IState = yield select(); 
    const currentUser = state.users.currentUser;
    const collectionIdx: number = payload;

    if (currentUser) {
        yield call(clientSocket.toogleCollectionVoteRequest, currentUser.userName, collectionIdx)
    };

};

function* setGameMembersWorker ({payload} : ReduxAction) {
    const state: IState = yield select();
    const currentUser = state.users.currentUser;
    const round = state.game.gameData.stage.round;
    const gameMembers = state.game.gameMembers;

    if (round === GameStages.noGame && Boolean(gameMembers.find(user => user.userName === currentUser?.userName))) {
        yield put(setGameStage(GameStages.preStart));
    }
}

function* setCollectionWorker({payload} : ReduxAction) {

    if (payload) {
        yield put(setGameStage(GameStages.prepareField));
    };

}

export default function* gameSagas() {
    yield takeEvery(GameActions.START_GAME_REQUEST, startGameRequestWorker);
    yield takeEvery(GameActions.SET_TEAM_REQUEST, setTeamRequestWorker);
    yield takeEvery(GameActions.SET_LEADER_REQUEST, setLeaderRequestWorker);
    yield takeEvery(GameActions.SET_GAME_MEMBERS, setGameMembersWorker);
    yield takeEvery(GameActions.TOGGLE_READY_REQUEST, toggleReadyRequest);
    yield takeEvery(GameActions.TOGGLE_COLLECTION_VOTE_REQUEST, collectionVoteRequestWorker);
    yield takeEvery(GameActions.SET_COLLECTION, setCollectionWorker)
}
