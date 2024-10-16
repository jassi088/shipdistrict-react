import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminFaqs from './super-admin.faqs';
import NoAccessPage from '@/features/errors/no-access.page';

const FAQSPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderFaqs = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminFaqs />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderFaqs()}</Fragment>;
};

export default FAQSPage;
