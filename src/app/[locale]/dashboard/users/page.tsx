'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useUsers } from '@/lib/hooks/useUsers';
import UsersTable from '@/components/UsersTable';

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Users'
    },
    vi: {
      title: 'Người dùng'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface UsersPageProps {
  params: Promise<{ locale: string }>;
}

export default function UsersPage({ params }: UsersPageProps) {
  const router = useRouter();
  const [locale, setLocale] = React.useState<string>('en');
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  const apiData = useUsers();
  const t = getTranslations(locale);

  const handleRowClick = (user: { _id: string; account: string }) => {
    router.push(`/${locale}/dashboard/user-history/${user.account}`);
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
    // Implement API call with new page if your API supports server-side pagination
  };

  const handlePageSizeChange = (pageSize: number) => {
    console.log('Page size changed to:', pageSize);
    // Implement API call with new page size if your API supports it
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>
      <div className="bg-white shadow-sm rounded-lg">
        <UsersTable 
          apiData={apiData}
          onRowClick={handleRowClick}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
} 