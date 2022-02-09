import { all } from "redux-saga/effects";
import appSagas from "./app/app.sagas";
import gameSagas from "./game/game.sagas";
import chatSagas from "./chat/chat.sagas";
import connectionSagas from "./connection/connection.sagas";

export default function* () {
    yield all([
        appSagas(), 
        gameSagas(), 
        chatSagas(),
        connectionSagas(),
    ]);
}
