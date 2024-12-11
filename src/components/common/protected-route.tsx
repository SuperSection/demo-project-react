import { Navigate, Outlet } from 'react-router';

import { APP_URL } from '@/config/appPaths';
import { useAppSelector } from '@/store/hooks';

export default function ProtectedRoute() {
  const auth = useAppSelector((state) => state.auth);

  if (!auth.accessToken && !auth.refreshToken) {
    return <Navigate to={APP_URL.login} />;
  }

  return <Outlet />;
}
