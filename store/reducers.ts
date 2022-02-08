import { combineReducers } from "redux";
import chatReducer from "./chat/chat.reducer";
import gameReducer from "./game/game.reducer";
import { appReducer } from "./app/app.reducer";

export const rootReducer = combineReducers({
    chat: chatReducer,
    game: gameReducer,
    app: appReducer,
});
