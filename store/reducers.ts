import { combineReducers } from "redux";
import { usersReducer } from "./users/users.reducer";
import chatReducer from "./chat/chat.reducer";
import gameReducer from "./game/game.reducer";
import { appReducer } from "./app/app.reducer";
import { serverDataReducer } from "./server/server.reducer";

export const rootReducer = combineReducers({
    users: usersReducer,
    chat: chatReducer,
    game: gameReducer,
    app: appReducer,
    server: serverDataReducer
});
