import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminCarrier from './super-admin.carrier';
import SubAdminCarrier from './sub-admin.carrier';
import NoAccessPage from '@/features/errors/no-access.page';

const CarrierPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderCarrier = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminCarrier />;
      case 'SUB_ADMIN':
        return <SubAdminCarrier />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderCarrier()}</Fragment>;
};

export default CarrierPage;
