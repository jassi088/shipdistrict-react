import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminMarginDiscount from './super-admin.margin-discount';
import NoAccessPage from '@/features/errors/no-access.page';

const MarginDiscountPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderMarginDiscount = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminMarginDiscount />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderMarginDiscount()}</Fragment>;
};

export default MarginDiscountPage;
