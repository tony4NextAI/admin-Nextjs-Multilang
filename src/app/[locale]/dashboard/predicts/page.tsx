'use client';

import React from 'react';
import { usePredicts, PredictFilterOptions } from '@/lib/hooks/usePredicts';
import PredictsTable from '@/components/PredictsTable';
import { FaChartLine } from 'react-icons/fa';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Predictions',
      filters: 'Filters',
      status: 'Status',
      isWin: 'Win Status',
      isPaid: 'Payment Status',
      applyFilters: 'Apply Filters',
      clearFilters: 'Clear Filters',
      all: 'All',
      pending: 'Pending',
      completed: 'Completed',
      win: 'Win',
      lose: 'Lose',
      paid: 'Paid',
      unpaid: 'Unpaid'
    },
    vi: {
      title: 'Dự đoán',
      filters: 'Bộ lọc',
      status: 'Trạng thái',
      isWin: 'Kết quả',
      isPaid: 'Thanh toán',
      applyFilters: 'Áp dụng bộ lọc',
      clearFilters: 'Xóa bộ lọc',
      all: 'Tất cả',
      pending: 'Đang chờ',
      completed: 'Hoàn thành',
      win: 'Thắng',
      lose: 'Thua',
      paid: 'Đã trả',
      unpaid: 'Chưa trả'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface PredictsPageProps {
  params: Promise<{ locale: string }>;
}

export default function PredictsPage({ params }: PredictsPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  const [filters, setFilters] = React.useState<PredictFilterOptions>({
    page: 1,
    limit: 10,
    filterBy: {},
    sortBy: {
      amount: -1,
    },
  });
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  const apiData = usePredicts(filters);
  const t = getTranslations(locale);

  const handleRowClick = (predict: { _id: string; predict: number; amount: number }) => {
    console.log('Clicked predict:', predict);
    alert(`Prediction: ${predict.predict}\nAmount: ${predict.amount.toLocaleString('vi-VN')} VND`);
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
    setFilters(prev => ({ ...prev, page }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    console.log('Page size changed to:', pageSize);
    setFilters(prev => ({ ...prev, limit: pageSize, page: 1 }));
  };

  const handleFilterChange = (key: string, value: string | number | boolean | undefined) => {
    setFilters(prev => ({
      ...prev,
      filterBy: {
        ...prev.filterBy,
        [key]: value === '' || value === undefined ? undefined : value,
      },
      page: 1
    }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      filterBy: {},
      sortBy: {
        amount: -1,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center">
        <FaChartLine className="mr-3 h-6 w-6 text-indigo-600" />
        {t.title}
      </h1>

      {/* Filter Panel */}
      <Card allowOverflow={true}>
        <div className="p-4">
          <div className="flex flex-wrap items-end gap-4">

            {/* Status Filter */}
            <div className="min-w-[140px]">
              <Select
                label={t.status}
                options={[
                  { value: '', label: t.all },
                  { value: 'pending', label: t.pending },
                  { value: 'completed', label: t.completed }
                ]}
                value={filters.filterBy?.status || ''}
                onChange={(value) => handleFilterChange('status', value || undefined)}
                placeholder={t.all}
              />
            </div>

            {/* Win Status Filter */}
            <div className="min-w-[140px]">
              <Select
                label={t.isWin}
                options={[
                  { value: '', label: t.all },
                  { value: 'true', label: t.win },
                  { value: 'false', label: t.lose }
                ]}
                value={filters.filterBy?.isWin === undefined ? '' : filters.filterBy?.isWin.toString()}
                onChange={(value) => handleFilterChange('isWin', value === '' ? undefined : value === 'true')}
                placeholder={t.all}
              />
            </div>

            {/* Payment Status Filter */}
            <div className="min-w-[140px]">
              <Select
                label={t.isPaid}
                options={[
                  { value: '', label: t.all },
                  { value: 'true', label: t.paid },
                  { value: 'false', label: t.unpaid }
                ]}
                value={filters.filterBy?.isPaid === undefined ? '' : filters.filterBy?.isPaid.toString()}
                onChange={(value) => handleFilterChange('isPaid', value === '' ? undefined : value === 'true')}
                placeholder={t.all}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 ml-auto">
              <Button 
                onClick={clearFilters}
                variant="outline"
                className="h-10"
              >
                {t.clearFilters}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <div className="bg-white shadow-sm rounded-lg">
        <PredictsTable 
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