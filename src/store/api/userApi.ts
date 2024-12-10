import { createApi } from '@reduxjs/toolkit/query/react';

import { UpdateAddressData, UpdatePasswordData } from '@/types/user.type';
import { API_URL } from '@/config/apiPaths';
import { clearTokens, clearUserData, setUserData } from '../slices/auth.slice';
import { baseQueryWithRetry } from './baseQuery';
import { RegistrationData } from '@/types/auth.type';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    getUser: builder.query<RegistrationData, void>({
      query: () => ({
        url: `${API_URL.profile}?t=${Date.now()}`,
        method: 'GET',
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 0,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('Fetched data:', data);
          dispatch(clearUserData());
          dispatch(setUserData(data)); // Store user data in the slice
        } catch (error) {
          console.error('Fetching user data failed:', error);
          dispatch(clearTokens()); // Clear tokens if unauthorized
        }
      },
    }),
    updateName: builder.mutation({
      query: (name: string) => ({
        url: API_URL.updateName,
        method: 'PUT',
        body: { name },
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData(data)); // Store user data in the slice
        } catch (error) {
          console.error('Updating user name failed:', error);
        }
      },
    }),
    updateMobile: builder.mutation({
      query: (mobile: string) => ({
        url: API_URL.updateMobile,
        method: 'PUT',
        body: { mobile },
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData(data)); // Store user data in the slice
        } catch (error) {
          console.error('Updating user mobile data failed:', error);
        }
      },
    }),
    updatePassword: builder.mutation({
      query: (data: UpdatePasswordData) => ({
        url: API_URL.updatePassword,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateAddress: builder.mutation({
      query: ({ addressId, address }: { addressId: string; address: UpdateAddressData }) => ({
        url: `${API_URL.updateAddress}/${addressId}`,
        method: 'PUT',
        body: address,
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData(data)); // Store user data in the slice
        } catch (error) {
          console.error('Updating user address failed:', error);
        }
      },
    }),
    logout: builder.mutation({
      query: (token: string) => ({
        url: API_URL.logout,
        method: 'POST',
        body: { token },
      }),
      onQueryStarted(_arg, { dispatch }) {
        dispatch(clearTokens());
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateNameMutation,
  useUpdateMobileMutation,
  useUpdatePasswordMutation,
  useUpdateAddressMutation,
  useLogoutMutation,
} = userApi;
