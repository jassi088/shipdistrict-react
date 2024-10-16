import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminCustomers from './super-admin.customers';
import SubAdminCustomers from './sub-admin.customers';
import NoAccessPage from '@/features/errors/no-access.page';

const CustomerListPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderCustomerList = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminCustomers />;
      case 'SUB_ADMIN':
        return <SubAdminCustomers />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderCustomerList()}</Fragment>;
};

export default CustomerListPage;
