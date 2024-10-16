import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminMailbox from './super-admin.mailbox';
import SubAdminMailbox from './sub-admin.mailbox';
import NoAccessPage from '@/features/errors/no-access.page';

const MailboxPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderMailbox = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminMailbox />;
      case 'SUB_ADMIN':
        return <SubAdminMailbox />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderMailbox()}</Fragment>;
};

export default MailboxPage;
