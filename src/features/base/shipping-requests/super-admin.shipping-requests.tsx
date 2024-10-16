import React, { useEffect } from 'react';
import Pagination from '@/features/shared/pagination';
import { useShippingRequestsStore } from '@/stores';
import { createGenericApi } from '@/http/generic-api';
import LoadingWrapper from '@/features/shared/loading-wrapper';
import { Typography } from '@/components/common/typography';
import DebouncedSearchInput from '@/components/common/debounced-input';

const SuperAdminShippingRequests: React.FC = () => {
  const { entities, setEntities, pageNo, pageSize, filters, setFilters, pagination } = useShippingRequestsStore();
  const api = createGenericApi<unknown, any>('shipments');

  const fetch = async () => {
    const response = await api.search({ pageNo, pageSize, query: filters });
    if (response) setEntities(response);
  };

  const handleSearch = (value: string) => {
    if (value !== filters.search) {
      setFilters({ ...filters, search: value });
    }
  };

  useEffect(() => {
    fetch();
  }, [pageNo, pageSize, filters]);

  return (
    <LoadingWrapper>
      <section className="w-full h-full bg-white">
        <div className="w-full flex items-center justify-between p-2">
          <div className="flex items-center gap-x-2">
            <DebouncedSearchInput value={filters.search} onSearch={handleSearch} />
          </div>
        </div>
        <table className="w-full bg-white border border-l-0 border-r-0 border-gray-200">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            {entities.length ? (
              entities.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-700">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.role?.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  <Typography variant="h5">No shipment request found.</Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <Pagination {...pagination()} />
    </LoadingWrapper>
  );
};

export default SuperAdminShippingRequests;
