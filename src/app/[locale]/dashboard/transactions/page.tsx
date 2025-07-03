'use client';

import React from 'react';
import { useTransactions, TransactionFilterOptions } from '@/lib/hooks/useTransactions';
import TransactionsTable from '@/components/TransactionsTable';
import { FaExchangeAlt } from 'react-icons/fa';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Transactions',
      filters: 'Filters',
      status: 'Status',
      type: 'Type',
      allStatuses: 'All Statuses',
      allTypes: 'All Types',
      success: 'Success',
      failed: 'Failed',
      unknow: 'Unknown',
      pending: 'Pending',
      deposit: 'Deposit',
      withdraw: 'Withdraw',
      clearFilters: 'Clear Filters'
    },
    vi: {
      title: 'Giao dịch',
      filters: 'Bộ lọc',
      status: 'Trạng thái',
      type: 'Loại',
      allStatuses: 'Tất cả trạng thái',
      allTypes: 'Tất cả loại',
      success: 'Thành công',
      failed: 'Thất bại',
      unknow: 'Không rõ',
      pending: 'Đang xử lý',
      deposit: 'Nạp tiền',
      withdraw: 'Rút tiền',
      clearFilters: 'Xóa bộ lọc'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface TransactionsPageProps {
  params: Promise<{ locale: string }>;
}

export default function TransactionsPage({ params }: TransactionsPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  const [filters, setFilters] = React.useState<TransactionFilterOptions>({});
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  const apiData = useTransactions(filters);
  const t = getTranslations(locale);

  const handleRowClick = (transaction: { _id: string; message: string; type: string }) => {
    console.log('Clicked transaction:', transaction);
    alert(`Transaction: ${transaction.type}\nMessage: ${transaction.message}`);
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
        <FaExchangeAlt className="mr-3 h-6 w-6 text-indigo-600" />
        {t.title}
      </h1>
      
      {/* Filter Panel */}
      <Card className="mb-6 p-4" allowOverflow={true}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t.filters}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
                { value: 'deposit', label: t.deposit },
                { value: 'withdraw', label: t.withdraw }
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
        <TransactionsTable 
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