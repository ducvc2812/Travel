import { type Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk, { type ThunkAction as ReduxThunkAction } from 'redux-thunk';

// import settingSlice from './slices/settingSlice'; 

const rootReducer = combineReducers({
 
    // setting: settingSlice
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ReduxThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
