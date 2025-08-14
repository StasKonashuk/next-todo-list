import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { accountApi } from 'services';

// @TODO: Add error handler
// import { rtkQueryErrorMiddleware } from './middlewares';
import { accountReducer, todosReducer } from './features';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeStore = (preloadedState?: any) =>
  configureStore({
    reducer: combinedReducer,
    // TODO: Add RTQ query middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountApi.middleware),
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default makeStore;
