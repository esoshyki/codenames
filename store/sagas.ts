import { all } from "redux-saga/effects";
import appSagas from "./app/app.sagas";
import gameSagas from "./game/game.sagas";
import chatSagas from "./chat/chat.sagas";

export default function* () {
    yield all([
        appSagas(), 
        gameSagas(), 
        chatSagas(),
    ]);
}
