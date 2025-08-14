import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { accountReducer, todosReducer } from 'features';
import { accountApi } from 'features/account';

const combinedReducer = combineReducers({
  account: accountReducer,
  todos: todosReducer,
  [accountApi.reducerPath]: accountApi.reducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeStore = (preloadedState?: any) =>
  configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountApi.middleware),
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default makeStore;
