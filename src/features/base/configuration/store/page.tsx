import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminStore from './super-admin.store';
import SubAdminStore from './sub-admin.store';
import NoAccessPage from '@/features/errors/no-access.page';

const StorePage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderStore = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminStore />;
      case 'SUB_ADMIN':
        return <SubAdminStore />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderStore()}</Fragment>;
};

export default StorePage;
