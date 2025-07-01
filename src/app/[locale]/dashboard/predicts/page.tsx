'use client';

import React from 'react';
import { usePredicts } from '@/lib/hooks/usePredicts';
import PredictsTable from '@/components/PredictsTable';
import { FaChartLine } from 'react-icons/fa';

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Predictions'
    },
    vi: {
      title: 'Dự đoán'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface PredictsPageProps {
  params: Promise<{ locale: string }>;
}

export default function PredictsPage({ params }: PredictsPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  // Use the updated usePredicts hook with pagination support
  const { data, isLoading, error, changePage, changePageSize, queryParams } = usePredicts();
  const t = getTranslations(locale);

  // Create apiData object in the expected format for PredictsTable
  const apiData = {
    data,
    isLoading,
    error,
  };

  const handleRowClick = (predict: { _id: string; predict: number; amount: number }) => {
    console.log('Clicked predict:', predict);
    alert(`Prediction: ${predict.predict}\nAmount: ${predict.amount.toLocaleString('vi-VN')} VND`);
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
        <FaChartLine className="mr-3 h-6 w-6 text-indigo-600" />
        {t.title}
      </h1>
      
      {/* Display current pagination info */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Current Pagination:</strong> Page {queryParams.page} | Limit {queryParams.limit} items per page
        </p>
      </div>

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