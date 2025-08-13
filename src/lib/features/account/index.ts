import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'lib/store';

export interface AccountState {
  id: string;
  email: string;
}

const initialState: AccountState = {
  id: '',
  email: '',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, { payload: { id, email } }: PayloadAction<AccountState>) => {
      state.id = id;
      state.email = email;
    },
  },
});

export const {
  reducer: accountReducer,
  actions: { setAccount },
} = accountSlice;

export const selectAccount = (state: RootState) => state.account;
