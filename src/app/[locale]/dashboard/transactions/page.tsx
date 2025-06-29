'use client';

import React from 'react';
import { useTransactions } from '@/lib/hooks/useTransactions';
import TransactionsTable from '@/components/TransactionsTable';

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

  const apiData = useTransactions();
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>
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