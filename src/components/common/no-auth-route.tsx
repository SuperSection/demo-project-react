import { Navigate, Outlet } from 'react-router';

// import useUser from '@/helpers/hooks/useUser';
import { APP_URL } from '@/config/appPaths';
import { useAppSelector } from '@/store/hooks';

export default function UnauthenticatedRoute() {
  const auth = useAppSelector((state) => state.auth);

  if (auth.accessToken || auth.refreshToken) {
    return <Navigate to={APP_URL.profile} />;
  }

  return <Outlet />;
}
