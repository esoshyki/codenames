import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './user/user.reducer';
import chatReducer from './chat/chat.reducer';

const persistConfig = {
    key: "codenames",
    storage,
    whitelist: [
        "user",
    ],
    blacklist: [
        "chat"
    ]
};

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const persistor = persistStore(store);

export { store, persistor }
