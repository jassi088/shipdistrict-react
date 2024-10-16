import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import CustomerDashboard from './customer.dashboard';
import SubAdminDashboard from './sub-admin.dashboard';
import SuperAdminDashboard from './super-admin.dashboard';
import NoAccessPage from '@/features/errors/no-access.page';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderDashboard = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminDashboard />;
      case 'SUB_ADMIN':
        return <SubAdminDashboard />;
      case 'CUSTOMER':
        return <CustomerDashboard />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderDashboard()}</Fragment>;
};

export default DashboardPage;
