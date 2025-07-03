'use client';

import React from 'react';
import { useBalanceHistory, BalanceHistoryFilterOptions } from '@/lib/hooks/useBalanceHistory';
import BalanceHistoryTable from '@/components/BalanceHistoryTable';
import { FaHistory } from 'react-icons/fa';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Balance History',
      filters: 'Filters',
      userId: 'User ID',
      status: 'Status',
      type: 'Type',
      allStatuses: 'All Statuses',
      allTypes: 'All Types',
      success: 'Success',
      failed: 'Failed',
      unknow: 'Unknown',
      pending: 'Pending',
      win: 'Win',
      play: 'Play',
      clearFilters: 'Clear Filters',
      userIdPlaceholder: 'Enter User ID'
    },
    vi: {
      title: 'Lịch sử số dư',
      filters: 'Bộ lọc',
      userId: 'ID người dùng',
      status: 'Trạng thái',
      type: 'Loại',
      allStatuses: 'Tất cả trạng thái',
      allTypes: 'Tất cả loại',
      success: 'Thành công',
      failed: 'Thất bại',
      unknow: 'Không rõ',
      pending: 'Đang xử lý',
      win: 'Thắng',
      play: 'Chơi',
      clearFilters: 'Xóa bộ lọc',
      userIdPlaceholder: 'Nhập ID người dùng'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface BalanceHistoryPageProps {
  params: Promise<{ locale: string }>;
}

export default function BalanceHistoryPage({ params }: BalanceHistoryPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  const [filters, setFilters] = React.useState<BalanceHistoryFilterOptions>({});
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  const apiData = useBalanceHistory(filters);
  const t = getTranslations(locale);

  const handleRowClick = (balanceEntry: { _id: string; amount: number; type: string; status: string }) => {
    console.log('Clicked balance entry:', balanceEntry);
    alert(`Type: ${balanceEntry.type}\nAmount: ${balanceEntry.amount.toLocaleString('vi-VN')} VND\nStatus: ${balanceEntry.status}`);
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
    // In a real app, this would trigger an API call with new page
  };

  const handlePageSizeChange = (pageSize: number) => {
    console.log('Page size changed to:', pageSize);
    // In a real app, this would trigger an API call with new page size
  };

  const handleFilterChange = (key: string, value: string) => {
    console.log('Filter changed:', key, value);
    setFilters(prev => ({
      ...prev,
      filterBy: {
        ...prev.filterBy,
        [key]: value || undefined, // Remove the filter if value is empty
      },
    }));
  };

  const clearFilters = () => {
    console.log('Clearing all filters');
    setFilters({});
  };

  const hasActiveFilters = filters.filterBy && Object.keys(filters.filterBy).length > 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <FaHistory className="mr-3 h-6 w-6 text-indigo-600" />
        {t.title}
      </h1>
      
      {/* Filter Panel */}
      <Card className="mb-6 p-4" allowOverflow={true}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t.filters}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* User ID Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.userId}
            </label>
            <Input
              value={filters.filterBy?.userId || ''}
              onChange={(e) => handleFilterChange('userId', e.target.value)}
              placeholder={t.userIdPlaceholder}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.status}
            </label>
            <Select
              value={filters.filterBy?.status || ''}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder={t.allStatuses}
              options={[
                { value: '', label: t.allStatuses },
                { value: 'success', label: t.success },
                { value: 'failed', label: t.failed },
                { value: 'unknow', label: t.unknow },
                { value: 'pending', label: t.pending }
              ]}
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.type}
            </label>
            <Select
              value={filters.filterBy?.type || ''}
              onChange={(value) => handleFilterChange('type', value)}
              placeholder={t.allTypes}
              options={[
                { value: '', label: t.allTypes },
                { value: 'win', label: t.win },
                { value: 'play', label: t.play }
              ]}
            />
          </div>

          {/* Clear Filters Button */}
          <div>
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="w-full max-w-[220px]"
            >
              {t.clearFilters}
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="bg-white shadow-sm rounded-lg">
        <BalanceHistoryTable 
          apiData={apiData}
          locale={locale}
          onRowClick={handleRowClick}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'vi' }
  ];
} 