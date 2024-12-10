import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import { RootState } from '@/types/store.type';
import { API_URL, BASE_API_URL } from '@/config/apiPaths';
import { clearTokens, setAccessToken } from '@/store/slices/auth.slice';
import { RefreshedAccessToken } from '@/types/auth.type';
import { APP_URL } from '@/config/appPaths';

export const baseQueryWithReauth = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithReauth(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error?.data?.code === 'TOKEN_EXPIRED')
  ) {
    // Attempt to refresh the token
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (refreshToken) {
      const refreshResult = (await baseQueryWithReauth(
        {
          url: API_URL.refreshToken,
          method: 'POST',
          body: { token: refreshToken },
        },
        api,
        extraOptions,
      )) as { data: RefreshedAccessToken };

      if (refreshResult.data) {
        console.log(refreshResult.data);
        api.dispatch(setAccessToken(refreshResult.data.token));

        // Retry the original request
        result = await baseQueryWithReauth(args, api, extraOptions);
      } else {
        console.log('Refresh token failed. Redirecting to login...');
        api.dispatch(clearTokens());
        window.location.href = APP_URL.login;
      }
    } else {
      console.log('No Token available. Redirecting to login...');
      // No refresh token available, force logout
      api.dispatch(clearTokens());
      window.location.href = APP_URL.login;
    }
  }

  return result;
};
