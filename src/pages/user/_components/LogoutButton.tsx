import { useNavigate } from 'react-router';

import { useAppSelector } from '@/store/hooks';
import { useLogoutMutation } from '@/store/api/userApi';
import { APP_URL } from '@/config/appPaths';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const navigate = useNavigate();

  const refreshToken = useAppSelector((state) => state.auth.refreshToken);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    // Clear user tokens and navigate to login page
    await logout(refreshToken ?? '');
    navigate(APP_URL.login);
  };

  return (
    <Button className="mx-auto mt-4 bg-red-500 hover:bg-red-600" onClick={handleLogout}>
      Logout
    </Button>
  );
}
