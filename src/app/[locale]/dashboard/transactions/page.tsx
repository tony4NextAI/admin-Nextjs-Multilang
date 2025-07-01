'use client';

import React from 'react';
import { useTransactions } from '@/lib/hooks/useTransactions';
import TransactionsTable from '@/components/TransactionsTable';
import { FaExchangeAlt } from 'react-icons/fa';

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Transactions'
    },
    vi: {
      title: 'Giao dịch'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface TransactionsPageProps {
  params: Promise<{ locale: string }>;
}

export default function TransactionsPage({ params }: TransactionsPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  // Use the updated useTransactions hook with pagination support
  const { data, isLoading, error, changePage, changePageSize, queryParams } = useTransactions();
  const t = getTranslations(locale);

  // Create apiData object in the expected format for TransactionsTable
  const apiData = {
    data,
    isLoading,
    error,
  };

  const handleRowClick = (transaction: { _id: string; message: string; type: string }) => {
    console.log('Clicked transaction:', transaction);
    alert(`Transaction: ${transaction.type}\nMessage: ${transaction.message}`);
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
        <FaExchangeAlt className="mr-3 h-6 w-6 text-indigo-600" />
        {t.title}
      </h1>
      
      {/* Display current pagination info */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Current Pagination:</strong> Page {queryParams.page} | Limit {queryParams.limit} items per page
        </p>
      </div>

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