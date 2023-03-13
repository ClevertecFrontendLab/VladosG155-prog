import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { baseApiUrl } from '../../settings/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseApiUrl}/api/auth/` }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/local/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: '/local',
        method: 'POST',
        body: userData,
      }),
    }),
    recoverPass: builder.mutation({
      query: (email) => ({ url: '/forgot-password', method: 'POST', body: email }),
    }),
    resetPass: builder.mutation({
      query: (email) => ({ url: '/reset-password', method: 'POST', body: email }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRecoverPassMutation, useResetPassMutation } = authApi;
