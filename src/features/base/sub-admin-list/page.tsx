import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminSubAdminList from './super-admin.sub-admin-list';
import NoAccessPage from '@/features/errors/no-access.page';

const CustomerListPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderCustomerList = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminSubAdminList />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderCustomerList()}</Fragment>;
};

export default CustomerListPage;
