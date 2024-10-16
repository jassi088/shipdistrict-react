import { Fragment } from 'react';
import { Route, Routes as RouteContainer, BrowserRouter as Router } from 'react-router-dom';
import { Paths } from '@/constants';
import PageNotFound from '@/features/errors/not-found.page';
import useNetwork from '@/hooks/useNetwork';
import NoInternetConnection from '@/features/errors/no-internet-connection';
import { AuthRoutes } from '@/features/auth/routes';
import { BaseRoutes } from '@/features/base/routes';

const Routes = () => {
  const isOnline = useNetwork();

  return (
    <Fragment>
      <Router>
        <RouteContainer>
          {AuthRoutes()}

          {BaseRoutes()}

          {/* UNKNOWN ROUTES */}
          <Route path={Paths.NOT_FOUND} element={<PageNotFound />} />
        </RouteContainer>
      </Router>

      {!isOnline && <NoInternetConnection />}
    </Fragment>
  );
};

export default Routes;
