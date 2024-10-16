import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import CustomerTrash from './customer.trash';
import NoAccessPage from '@/features/errors/no-access.page';

const TrashPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const Trash = () => {
    switch (code) {
      case 'CUSTOMER':
        return <CustomerTrash />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{Trash()}</Fragment>;
};

export default TrashPage;
