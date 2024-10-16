import { Fragment } from 'react';
import { useAuthStore } from '@/stores';
import SuperAdminSetting from './super-admin.setting';
import SubAdminSetting from './sub-admin.setting';
import NoAccessPage from '@/features/errors/no-access.page';

const SettingPage = () => {
  const { user } = useAuthStore();
  const code = user?.role?.code;

  const renderSetting = () => {
    switch (code) {
      case 'SUPER_ADMIN':
        return <SuperAdminSetting />;
      case 'SUB_ADMIN':
        return <SubAdminSetting />;
      default:
        return <NoAccessPage />;
    }
  };

  return <Fragment>{renderSetting()}</Fragment>;
};

export default SettingPage;
