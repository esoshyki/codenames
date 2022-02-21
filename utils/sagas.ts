import { IState } from "@/types";
import { select } from "redux-saga/effects";

export function* getCurrentUser () {
    const state: IState = yield select();
    return state.connection.currentUser
};

export function* getGameMembers () {
    const state: IState = yield select();
    return state.game.gameMembers
};


