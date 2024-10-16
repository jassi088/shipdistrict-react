import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminAddressList from './super-admin.address-list';
import CustomerAddressList from './customer.address-list';
import NoAccessPage from '@/features/errors/no-access.page';

const AddressListPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderAddressList = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminAddressList />;
      case 'CUSTOMER':
        return <CustomerAddressList />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderAddressList()}</Fragment>;
};

export default AddressListPage;
