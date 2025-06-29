'use client';

import React from 'react';
import { useBalanceHistory } from '@/lib/hooks/useBalanceHistory';
import BalanceHistoryTable from '@/components/BalanceHistoryTable';

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

  const apiData = useBalanceHistory();
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>
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