import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { api } from '../network/api';

const reducers = combineReducers({
    [api.reducerPath]: api.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme', 'auth', 'users']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        const middlewares = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(api.middleware);

        // if (__DEV__ && !process.env.JEST_WORKER_ID) {
        //     const createDebugger = require('redux-flipper').default;
        //     middlewares.push(createDebugger());
        // }

        return middlewares;
    }
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor, storage };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
