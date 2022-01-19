import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './user/user.reducer';
import chatReducer from './chat/chat.reducer';
import gameReducer from './game/game.reducer';

const persistConfig = {
    key: "codenames",
    storage,
    whitelist: [

    ],
    blacklist: [
        "user",
        "chat",
        "game"
    ]
};

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    game: gameReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const persistor = persistStore(store);

export { store, persistor }
