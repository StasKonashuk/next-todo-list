import { readLocalStorageValue } from '@mantine/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'shared/types';

export interface AccountState extends User {
  isWelcomeScreenHidden?: boolean;
  isAuthorized?: boolean;
}

interface SetIsWelcomeScreenHiddenPayload {
  isWelcomeScreenHidden?: boolean;
}

const initialState: AccountState = {
  _id: '',
  email: '',
  isAuthorized: false,
  isWelcomeScreenHidden: Boolean(readLocalStorageValue({ key: 'isWelcomeScreenHidden' })),
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, { payload: { _id, email, isAuthorized } }: PayloadAction<AccountState>) => {
      state._id = _id;
      state.email = email;
      state.isAuthorized = isAuthorized;
    },

    setIsWelcomeScreenHidden: (
      state,
      { payload: { isWelcomeScreenHidden } }: PayloadAction<SetIsWelcomeScreenHiddenPayload>,
    ) => {
      localStorage.setItem('isWelcomeScreenHidden', String(isWelcomeScreenHidden));

      state.isWelcomeScreenHidden = isWelcomeScreenHidden;
    },

    logout: (state) => {
      state.isAuthorized = false;
    },
  },
});

export const {
  reducer: accountReducer,
  actions: { setAccount, setIsWelcomeScreenHidden, logout },
} = accountSlice;
