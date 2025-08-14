import { readLocalStorageValue } from '@mantine/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'lib/store';

export interface AccountState {
  id: string;
  email: string;
  isWelcomeScreenDisplayed?: boolean;
}

interface SetIsWelcomeScreenDisplayedPayload {
  isWelcomeScreenDisplayed?: boolean;
}

const initialState: AccountState = {
  id: '',
  email: '',
  isWelcomeScreenDisplayed: Boolean(readLocalStorageValue({ key: 'isWelcomeScreenDisplayed' })),
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, { payload: { id, email } }: PayloadAction<AccountState>) => {
      state.id = id;
      state.email = email;
    },

    setIsWelcomeScreenDisplayed: (
      state,
      { payload: { isWelcomeScreenDisplayed } }: PayloadAction<SetIsWelcomeScreenDisplayedPayload>,
    ) => {
      localStorage.setItem('isWelcomeScreenDisplayed', String(isWelcomeScreenDisplayed));

      state.isWelcomeScreenDisplayed = isWelcomeScreenDisplayed;
    },
  },
});

export const {
  reducer: accountReducer,
  actions: { setAccount, setIsWelcomeScreenDisplayed },
} = accountSlice;

export const selectAccount = (state: RootState) => state.account;
