import clientSocket from "@/socket/client";
import { Actions, IAction } from "@/types/actions";
import { AppStages } from "@/types/app";
import { IField, Sides } from "@/types/game";
import { IUser } from "@/types/users";
import { getCurrentUser, getGameMembers } from "@/utils/sagas";
import { call, put, takeEvery } from "redux-saga/effects";
import { changeAppStageRequest } from "../app/app.actions";
import { SetCurrentUserLeader, setCurrentUserReady, setCurrentUserTeam } from "../connection/connection.actions";
import { setBlueTeam, setField, setGameMembers, setRedTeam } from "./game.actions";

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
    const currentUser : IUser = yield getCurrentUser();
    const currentMember = newMembers.find(member => member.userName === currentUser.userName);

    if (currentMember) {
        yield put(setCurrentUserTeam(currentMember.team));
        yield put(SetCurrentUserLeader(currentMember.leader));
        yield put(setCurrentUserReady(currentMember.ready));
    };

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
};

function* toggleLeaderRequestWorker() {
    const currentUser: IUser = yield getCurrentUser();
    const isLeader = currentUser.leader ? undefined : true;
    yield call(clientSocket.game.updateGameMember, {
        ...currentUser,
        leader: isLeader
    });
};

function* toggleReadyRequestWorker() {
    const currentUser: IUser = yield getCurrentUser();
    const isReady = currentUser.ready ? undefined : true;
    yield call(clientSocket.game.updateGameMember,
        {
            ...currentUser,
            ready: isReady
        })
};

function* toggleCollectionVoteRequestWorker(action: IAction) {
    const currentUser: IUser = yield getCurrentUser();
    const collectionVote = currentUser.collectionVote === action.payload ? undefined : action.payload;

    yield call(clientSocket.game.updateGameMember, {
        ...currentUser,
        collectionVote
    });
}

function* allReadyRequestWorker() {
    yield put(changeAppStageRequest(AppStages.CollectionVote))
};

function* setFieldRequestWorker(action: IAction) {
    const field : IField = action.payload;

    yield put(setField(field));
    yield put(changeAppStageRequest(AppStages.game))
}


export default function* gameSagas() {
    yield takeEvery(Actions.game.StartGameRequest, startGameRequestWorker);
    yield takeEvery(Actions.game.UpdateGameMembersRequest, updateGameMembersRequestWorker);
    yield takeEvery(Actions.game.ToggleTeamRequest, toggleTeamRequestWorker);
    yield takeEvery(Actions.game.ToggleLeaderRequest, toggleLeaderRequestWorker);
    yield takeEvery(Actions.game.ToggleReadyRequest, toggleReadyRequestWorker);
    yield takeEvery(Actions.game.AllReadyRequest, allReadyRequestWorker);
    yield takeEvery(Actions.game.ToggleCollectionVoteRequest, toggleCollectionVoteRequestWorker);
    yield takeEvery(Actions.game.SetFieldRequest, setFieldRequestWorker)
}
