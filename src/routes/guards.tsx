import { Paths } from '@/constants';
import { Navigate, Outlet } from 'react-router-dom';

interface IProtectedRoute {
  isRouteAccessible: boolean;
  redirectRoute?: string;
}

export const ProtectedRoute = ({
  isRouteAccessible = false,
  redirectRoute = Paths.LOGIN,
}: IProtectedRoute): JSX.Element => {
  return isRouteAccessible ? <Outlet /> : <Navigate to={redirectRoute} replace />;
};
