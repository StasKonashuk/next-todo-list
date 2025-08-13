import { combineReducers, configureStore } from '@reduxjs/toolkit';
// @TODO: Add error handler
// import { rtkQueryErrorMiddleware } from './middlewares';
import { accountReducer, todosReducer } from './features';
import { accountApi } from 'services';
// @TODO: Add requests handler
// import { authApi, moviesApi } from '../api/agents';

const combinedReducer = combineReducers({
  account: accountReducer,
  todos: todosReducer,
  [accountApi.reducerPath]: accountApi.reducer,
  // @TODO: Fix
  // [authApi.reducerPath]: authApi.reducer,
  // [moviesApi.reducerPath]: moviesApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
    // TODO: Add RTQ query middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
