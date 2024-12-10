import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { RootState } from '@/types/store.type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { APP_URL } from '@/config/appPaths';
import { userApi } from '@/store/api/userApi';

export default function useUser() {
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // If no tokens are available, navigate to login
    if (!auth.accessToken && !auth.refreshToken) {
      navigate(APP_URL.login);
      return;
    }

    if (auth.accessToken && !auth.user) {
      dispatch(userApi.endpoints.getUser.initiate(undefined, { forceRefetch: true }));
    }
  }, [auth.accessToken, auth.refreshToken, auth.user, dispatch, navigate]);

  return auth.user;
}
