import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from 'shared/types';
import { ApiError, SignInParams } from 'shared/types';

const BASE_URL = '/api/account';

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' }),
  endpoints: (builder) => ({
    getAccount: builder.query<User, void>({
      query: () => '/',
    }),
    signIn: builder.mutation<User, SignInParams, BaseQueryFn<string | FetchArgs, unknown, ApiError>>({
      query: (body: SignInParams) => ({
        url: '/sign-in',
        method: 'POST',
        body,
      }),
    }),
    signOut: builder.mutation<User, void>({
      query: () => ({
        url: '/sign-out',
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetAccountQuery, useSignInMutation, useSignOutMutation } = accountApi;
