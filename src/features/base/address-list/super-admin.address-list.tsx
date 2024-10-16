import React, { useEffect } from 'react';
import Pagination from '@/features/shared/pagination';
import { useMailboxStore } from '@/stores';
import { createGenericApi } from '@/http/generic-api';
import LoadingWrapper from '@/features/shared/loading-wrapper';
import CommonSelect from '@/components/common/select-option';
import { Typography } from '@/components/common/typography';
import DebouncedSearchInput from '@/components/common/debounced-input';
import { Button } from '@/components/ui/button';
import { DownloadCloud } from 'lucide-react';

const SuperAdminAddressList: React.FC = () => {
  const { entities, setEntities, pageNo, pageSize, filters, setFilters, pagination } = useMailboxStore();
  const api = createGenericApi<unknown, any>('mailbox');

  const fetch = async () => {
    const response = await api.search({ pageNo, pageSize, query: filters });
    if (response) setEntities(response);
  };

  const handleSearch = (value: string) => {
    if (value !== filters.search) {
      setFilters({ ...filters, search: value });
    }
  };

  const handleStatusChange = (value: string) => {
    setFilters({ ...filters, status: value });
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
            <CommonSelect
              value={filters?.status}
              onChange={handleStatusChange}
              placeholder="Filter"
              options={[
                { label: 'Created', value: 'created' },
                { label: 'Imported', value: 'imported' },
              ]}
              clearable
            />
          </div>
          <div className="flex items-center gap-x-2">
            <Button variant="outline" className="text-gray-400 border-gray-400">
              <DownloadCloud size={20} />
            </Button>
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
                  <Typography variant="h5">No address found.</Typography>
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

export default SuperAdminAddressList;
