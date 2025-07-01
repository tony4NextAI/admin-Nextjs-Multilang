'use client';

import React from 'react';
import { useBalanceHistory } from '@/lib/hooks/useBalanceHistory';
import BalanceHistoryTable from '@/components/BalanceHistoryTable';
import { FaHistory } from 'react-icons/fa';

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Balance History'
    },
    vi: {
      title: 'Lịch sử số dư'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface BalanceHistoryPageProps {
  params: Promise<{ locale: string }>;
}

export default function BalanceHistoryPage({ params }: BalanceHistoryPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  // Use the updated useBalanceHistory hook with pagination support
  const { data, isLoading, error, changePage, changePageSize, queryParams } = useBalanceHistory();
  const t = getTranslations(locale);

  // Create apiData object in the expected format for BalanceHistoryTable
  const apiData = {
    data,
    isLoading,
    error,
  };

  const handleRowClick = (balanceEntry: { _id: string; amount: number; type: string; status: string }) => {
    console.log('Clicked balance entry:', balanceEntry);
    alert(`Type: ${balanceEntry.type}\nAmount: ${balanceEntry.amount.toLocaleString('vi-VN')} VND\nStatus: ${balanceEntry.status}`);
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
    changePage(page); // Use the changePage function from the hook
  };

  const handlePageSizeChange = (pageSize: number) => {
    console.log('Page size changed to:', pageSize);
    changePageSize(pageSize); // Use the changePageSize function from the hook
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <FaHistory className="mr-3 h-6 w-6 text-indigo-600" />
        {t.title}
      </h1>
      
      {/* Display current pagination info */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Current Pagination:</strong> Page {queryParams.page} | Limit {queryParams.limit} items per page
        </p>
      </div>

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