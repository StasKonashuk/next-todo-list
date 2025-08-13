import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from './types';
import { ApiError, SignInParams } from 'lib/types';

const BASE_URL = 'http://localhost:3000/api/account';

export const accountApi = createApi({
  reducerPath: 'accountApi',

  // @TODO: Add env
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    getAccount: builder.query<User, void>({
      query: () => `/`,
    }),
    signIn: builder.mutation<User, SignInParams, BaseQueryFn<string | FetchArgs, unknown, ApiError>>({
      query: (body: SignInParams) => ({
        url: `/sign-in`,
        method: 'POST',
        body,
      }),
    }),
    signOut: builder.mutation<User, void>({
      query: () => ({
        url: `/sign-out`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetAccountQuery, useSignInMutation, useSignOutMutation } = accountApi;
