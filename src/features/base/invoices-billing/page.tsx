import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminInvoicesBilling from './super-admin.invoices-billing';
import SubAdminInvoicesBilling from './sub-admin.invoices-billing';
import NoAccessPage from '@/features/errors/no-access.page';

const InvoicesBillingPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderInvoicesBilling = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminInvoicesBilling />;
      case 'SUB_ADMIN':
        return <SubAdminInvoicesBilling />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderInvoicesBilling()}</Fragment>;
};

export default InvoicesBillingPage;
