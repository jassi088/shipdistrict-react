import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminSubAdminInvoices from './super-admin.sub-admin-invoices';
import NoAccessPage from '@/features/errors/no-access.page';

const SubAdminInvoicesPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderSubAdminInvoices = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminSubAdminInvoices />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderSubAdminInvoices()}</Fragment>;
};

export default SubAdminInvoicesPage;
