import { Route } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/guards';
import { Paths } from '@/constants';
import { useAuthStore } from '@/stores';
import RegisterPage from '@/features/auth/register/page';
import Login from '@/features/auth/login/page';
import ForgotPassword from '@/features/auth/forgot-password/page';
import ResetPassword from '@/features/auth/reset-password/page';
import VerifyEmail from '@/features/auth/verify-email/page';

export const AuthRoutes = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <Route element={<ProtectedRoute isRouteAccessible={!isAuthenticated} redirectRoute={Paths.DASHBOARD} />}>
        <Route index path={Paths.LOGIN} element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute isRouteAccessible={!isAuthenticated} redirectRoute={Paths.DASHBOARD} />}>
        <Route index path={Paths.REGISTER} element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute isRouteAccessible={!isAuthenticated} redirectRoute={Paths.LOGIN} />}>
        <Route path={Paths.FORGOT_PASSWORD} element={<ForgotPassword />} />
      </Route>
      <Route element={<ProtectedRoute isRouteAccessible={!isAuthenticated} redirectRoute={Paths.LOGIN} />}>
        <Route path={Paths.OTP} element={<VerifyEmail />} />
      </Route>
      <Route element={<ProtectedRoute isRouteAccessible={!isAuthenticated} redirectRoute={Paths.LOGIN} />}>
        <Route path={Paths.RESET_PASSWORD} element={<ResetPassword />} />
      </Route>
    </>
  );
};
