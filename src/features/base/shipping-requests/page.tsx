import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminShippingRequests from './super-admin.shipping-requests';
import NoAccessPage from '@/features/errors/no-access.page';

const ShippingRequestsPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderShippingRequests = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminShippingRequests />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderShippingRequests()}</Fragment>;
};

export default ShippingRequestsPage;
