import React, { Fragment, useEffect } from 'react';
import Pagination from '@/features/shared/pagination';
import { useCustomerListStore, useDialogStore, useLoadingStore } from '@/stores';
import { createGenericApi } from '@/http/generic-api';
import { Profile, UserModel } from '@/types/auth';
import CommonSelect from '@/components/common/select-option';
import { Typography } from '@/components/common/typography';
import DebouncedSearchInput from '@/components/common/debounced-input';
import { Button } from '@/components/ui/button';
import InviteCustomer from './invite';
import { useRouteNavigator } from '@/hooks';
import { strings } from '@/utils/helpers';
import { Paths } from '@/constants';
import Spinner from '@/components/common/loaders/spinner';

const SuperAdminCustomerList: React.FC = () => {
  const { goToRoute } = useRouteNavigator();
  const isLoading = useLoadingStore((state) => state.requestLoading);
  const { onDialogChange } = useDialogStore();

  const { entities, setEntities, pageNo, pageSize, filters, setFilters, pagination } = useCustomerListStore();
  const api = createGenericApi<unknown, UserModel>('users');

  const fetch = async () => {
    const response = await api.search({ pageNo, pageSize, query: { ...filters, roleCode: 'USER' } });
    if (response) setEntities(response);
  };

  const handleStatusChange = (value: string) => {
    setFilters({ ...filters, status: value });
  };

  const handleAccountChange = (value: string) => {
    setFilters({ ...filters, accountType: value });
  };

  const handlePositionChange = (value: string) => {
    setFilters({ ...filters, position: value });
  };

  const handleSearch = (value: string) => {
    if (value !== filters.search) {
      setFilters({ ...filters, search: value });
    }
  };

  function getAccountStatus(profiles: Profile[]) {
    let shipmentAccountStatus = null;
    let mailboxAccountStatus = null;

    profiles.forEach((profile: Profile) => {
      if (profile.accountType === 'shipment') {
        shipmentAccountStatus = profile.isShipmentAccountVerified;
      } else if (profile.accountType === 'mailBox') {
        mailboxAccountStatus = profile.isMailBoxAccountVerified;
      }
    });

    return {
      shipmentAccountStatus,
      mailboxAccountStatus,
    };
  }

  useEffect(() => {
    fetch();
  }, [pageNo, pageSize, filters]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
     <Fragment>
      {/* Filters and buttons */}
      <div className="w-full p-5 overflow-x-scroll">
        <div className="w-full flex flex-col items-center justify-between p-2 border border-gray-200 rounded-t-lg md:flex-row">
          <div className="w-full flex flex-col items-center gap-x-2 md:flex-row">
            <DebouncedSearchInput value={filters.search} onSearch={handleSearch} />
            <CommonSelect
              value={filters?.status}
              onChange={handleStatusChange}
              placeholder="Status"
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Pending', value: 'pending' },
                { label: 'Inactive', value: 'inactive' },
              ]}
              clearable
            />
            <CommonSelect
              value={filters?.accountType}
              onChange={handleAccountChange}
              placeholder="Account"
              options={[
                { label: 'Shipment', value: 'shipment' },
                { label: 'Mailbox', value: 'mailbox' },
                { label: 'Both', value: 'both' },
              ]}
              clearable
            />
            <CommonSelect
              value={filters?.position}
              onChange={handlePositionChange}
              placeholder="Position"
              options={[
                { label: 'Normal', value: 'normal' },
                { label: 'Vip', value: 'vip' },
                { label: 'Pro', value: 'pro' },
              ]}
              clearable
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Button variant="ghost" className="box-shadow text-primary" onClick={() => onDialogChange('invite', true)}>
              Invite Customer
            </Button>
            <InviteCustomer />
            <Button
              variant="ghost"
              className="box-shadow bg-orange-400 text-white"
              onClick={() => goToRoute(strings.normalizeRoute(Paths.CREATE))}
            >
              + Add Customer
            </Button>
          </div>
        </div>

        {/* Scrollable table container */}
        <table className="w-full bg-white">
          <thead className="border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Customer Id</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Customer Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">City</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Account Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">User Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Shipment Account</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Mailbox Account</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {entities.length ? (
              entities.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{user?.UniqueId || '--'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user?.fullName || '--'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user?.email || '--'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user?.currentProfile?.city || '--'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user?.accountType || '--'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user?.userPositionTag || '--'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {getAccountStatus(user?.profiles).shipmentAccountStatus ? 'Approved' : 'Pending'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {getAccountStatus(user?.profiles).mailboxAccountStatus ? 'Approved' : 'Pending'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user?.status || '--'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  <Typography variant="h5">No users found.</Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination {...pagination()} />
      </Fragment>
  );
};

export default SuperAdminCustomerList;
