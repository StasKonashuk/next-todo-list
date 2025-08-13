import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from './types';

const BASE_URL = 'http://localhost:3000/api/account';

export const accountApi = createApi({
  reducerPath: 'accountApi',

  // @TODO: Add env
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    getAccount: builder.query<User, undefined>({
      query: () => `/`,
    }),
  }),
});

export const { useGetAccountQuery } = accountApi;
