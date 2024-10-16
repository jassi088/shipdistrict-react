import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import CustomerShipments from './customer.shipments';
import SuperAdminShipments from './super-admin.shipments';
import NoAccessPage from '@/features/errors/no-access.page';

const ShipmentsPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderShipments = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminShipments />;
      case 'CUSTOMER':
        return <CustomerShipments />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderShipments()}</Fragment>;
};

export default ShipmentsPage;
