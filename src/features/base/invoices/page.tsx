import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import CustomerInvoices from './customer.invoices';
import NoAccessPage from '@/features/errors/no-access.page';

const InvoicesPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderInvoices = () => {
    switch (code) {
      case 'CUSTOMER':
        return <CustomerInvoices />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderInvoices()}</Fragment>;
};

export default InvoicesPage;
