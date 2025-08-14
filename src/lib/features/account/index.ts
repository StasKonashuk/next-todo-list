import { readLocalStorageValue } from '@mantine/hooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountState {
  id: string;
  email: string;
  isWelcomeScreenHidden?: boolean;
}

interface SetIsWelcomeScreenHiddenPayload {
  isWelcomeScreenHidden?: boolean;
}

const initialState: AccountState = {
  id: '',
  email: '',
  isWelcomeScreenHidden: Boolean(readLocalStorageValue({ key: 'isWelcomeScreenHidden' })),
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, { payload: { id, email } }: PayloadAction<AccountState>) => {
      state.id = id;
      state.email = email;
    },

    setIsWelcomeScreenHidden: (
      state,
      { payload: { isWelcomeScreenHidden } }: PayloadAction<SetIsWelcomeScreenHiddenPayload>,
    ) => {
      localStorage.setItem('isWelcomeScreenHidden', String(isWelcomeScreenHidden));

      state.isWelcomeScreenHidden = isWelcomeScreenHidden;
    },
  },
});

export const {
  reducer: accountReducer,
  actions: { setAccount, setIsWelcomeScreenHidden },
} = accountSlice;
