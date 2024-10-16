import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import CustomerInbox from './customer.inbox';
import NoAccessPage from '@/features/errors/no-access.page';

const InboxPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderInbox = () => {
    switch (code) {
      case 'CUSTOMER':
        return <CustomerInbox />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderInbox()}</Fragment>;
};

export default InboxPage;
