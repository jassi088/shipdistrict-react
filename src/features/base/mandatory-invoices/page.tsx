import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SubAdminMandatoryInvoices from './sub-admin.mandatory-invoices';
import NoAccessPage from '@/features/errors/no-access.page';

const MandatoryInvoicesPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderMandatoryInvoices = () => {
    switch (code) {
      case 'SUB_ADMIN':
        return <SubAdminMandatoryInvoices />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderMandatoryInvoices()}</Fragment>;
};

export default MandatoryInvoicesPage;
