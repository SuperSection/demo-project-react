import { Route, Routes } from 'react-router';

import './App.css';
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
import Registration from '@/pages/auth/Registration';
import UserProfile from '@/pages/user/profile/UserProfile';
import ProtectedRoute from '@/components/common/protected-route';
import UnauthenticatedRoute from '@/components/common/no-auth-route';
import UserInfo from '@/pages/user/_components/UserInfo';
import AddressInfo from '@/pages/user/_components/AddressInfo';
import { APP_URL } from '@/config/appPaths';

function App() {
  return (
    <Routes>
      <Route element={<UnauthenticatedRoute />}>
        <Route path={APP_URL.register} element={<Registration />} />
        <Route path={APP_URL.login} element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
        <Route
          path={APP_URL.profile}
          element={
            <UserProfile>
              <UserInfo />
            </UserProfile>
          }
        />
        <Route
          path={APP_URL.address}
          element={
            <UserProfile>
              <AddressInfo />
            </UserProfile>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
