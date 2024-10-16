import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import CustomerAccountSetting from './customer.account-setting';
import NoAccessPage from '@/features/errors/no-access.page';

const AccountSettingPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderAccountSetting = () => {
    switch (code) {
      case 'CUSTOMER':
        return <CustomerAccountSetting />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderAccountSetting()}</Fragment>;
};

export default AccountSettingPage;
