import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminPlans from './super-admin.plans';
import SubAdminPlans from './sub-admin.plans';
import NoAccessPage from '@/features/errors/no-access.page';

const PlansPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderPlans = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminPlans />;
      case 'SUB_ADMIN':
        return <SubAdminPlans />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderPlans()}</Fragment>;
};

export default PlansPage;
