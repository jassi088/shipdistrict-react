import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminMailboxRequest from './super-admin.mailbox-request';
import SubAdminMailbox from './sub-admin.mailbox-request';
import NoAccessPage from '@/features/errors/no-access.page';

const MailboxRequestPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderMailboxRequest = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminMailboxRequest />;
      case 'SUB_ADMIN':
        return <SubAdminMailbox />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderMailboxRequest()}</Fragment>;
};

export default MailboxRequestPage;
