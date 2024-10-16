import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import CustomerArchive from './customer.achive';
import NoAccessPage from '@/features/errors/no-access.page';

const ArchivePage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderArchive = () => {
    switch (code) {
      case 'CUSTOMER':
        return <CustomerArchive />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderArchive()}</Fragment>;
};

export default ArchivePage;
