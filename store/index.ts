import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sagas from './sagas';
import { rootReducer } from './reducers';

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

const sagaMiddleware = createSagaMiddleware();



const persistedReducer = persistReducer(persistConfig, rootReducer);

const initStore = () => {
    const store = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(sagas);
    return store
};

const store = initStore();

const persistor = persistStore(store);

export { store, persistor }
