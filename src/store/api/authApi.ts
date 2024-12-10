import { createApi } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../../config/apiPaths';
import { clearTokens, setTokens } from '@/store/slices/auth.slice';
import { type RegistrationData } from '@/types/auth.type';
import { baseQueryWithRetry } from './baseQuery';
import { userApi } from './userApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    register: builder.mutation<void, RegistrationData>({
      query: (data) => ({
        url: API_URL.register,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: API_URL.login,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(clearTokens());
          dispatch(setTokens(data));
          dispatch(userApi.endpoints.getUser.initiate());
        } catch (error) {
          console.error('Login failed', error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
