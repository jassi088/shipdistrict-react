import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminAnalyticsReports from './super-admin.analytics-reports';
import NoAccessPage from '@/features/errors/no-access.page';

const AnalyticsReportsPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderAnalyticsReports = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminAnalyticsReports />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderAnalyticsReports()}</Fragment>;
};

export default AnalyticsReportsPage;
