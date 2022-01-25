import { call, put, takeEvery } from "redux-saga/effects";
import { GameActions } from "./game.types";
import { getGuesserData } from "../../utils/getGuesser";
import {
    setFieldData,
    setGameMembers,
    setGuesserData,
    setStartSide,
    setVotedToStartMembers
} from "./game.actions";
import { getWords } from "../../utils/wordCollections";
import { IAction, IFBUserData } from "../types";
import API from "@/api";
import { databaseService } from "@/firebase/db";

function* gameStartRequestWorker({ payload }: IAction) {
    const { data, start } = yield call(getGuesserData);
    yield put(setGuesserData(data));
    yield put(setStartSide(start));
    const words = getWords(payload);
    yield put(setFieldData(words));
}

function* getWordsRequestWorker({ payload }: IAction) {
    const words = getWords(payload);
    yield put(setFieldData(words));
}

function* setReadyRequestWorker({ payload }: IAction) {
    yield call(API.userReady, payload);
}

function* setUnreadyRequestWorker({ payload }: IAction) {
    yield call(API.userUnready, payload);
}

function* getReadyUsersRequestWorker() {
    const newReadyUsers: IFBUserData[] = yield call(
        databaseService.getGameMembers
    );
    yield put(setGameMembers(newReadyUsers));
}

function* getVotedToStartWorker() {
    const newVotedToStart: IFBUserData[] = yield call(
        databaseService.getVotedToStartMembers
    );
    yield put(setVotedToStartMembers(newVotedToStart));
}

export default function* gameSagas() {
    yield takeEvery(GameActions.GAME_START_REQUEST, gameStartRequestWorker);
    yield takeEvery(GameActions.GET_WORDS_REQUEST, getWordsRequestWorker);
    yield takeEvery(GameActions.SET_READY_REQUEST, setReadyRequestWorker);
    yield takeEvery(GameActions.SET_UNREADY_REQUEST, setUnreadyRequestWorker);
    yield takeEvery(
        GameActions.GET_READY_USERS_REQUEST,
        getReadyUsersRequestWorker
    );
    yield takeEvery(GameActions.GET_VOTED_TO_START, getVotedToStartWorker);
}
