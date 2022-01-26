import { all } from "redux-saga/effects";
import appSagas from "./app/app.sagas";
import gameSagas from "./game/game.sagas";
import usersSaga from "./users/users.sagas";
import serverSagas from "./server/server.sagas";
import chatSagas from "./chat/chat.sagas";

export default function* () {
    yield all([
        usersSaga(), 
        appSagas(), 
        gameSagas(), 
        serverSagas(),
        chatSagas(),
    ]);
}
