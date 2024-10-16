import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import CustomerPackages from './customer.packages';
import NoAccessPage from '@/features/errors/no-access.page';

const PackagesPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderPackages = () => {
    switch (code) {
      case 'CUSTOMER':
        return <CustomerPackages />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderPackages()}</Fragment>;
};

export default PackagesPage;
