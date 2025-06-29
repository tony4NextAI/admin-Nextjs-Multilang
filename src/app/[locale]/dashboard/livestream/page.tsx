'use client';

import React from 'react';
import { useLiveStream } from '@/lib/hooks/useLiveStream';
import LiveStreamTable from '@/components/LiveStreamTable';
import { FaVideo } from 'react-icons/fa';
// import QueryExample from '@/components/QueryExample';

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Livestream Management',
      reactQueryTitle: 'React Query Demo'
    },
    vi: {
      title: 'Quản lý phát trực tiếp',
      reactQueryTitle: 'Demo React Query'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface LivestreamPageProps {
  params: Promise<{ locale: string }>;
}

export default function LivestreamPage({ params }: LivestreamPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  const apiData = useLiveStream();
  const t = getTranslations(locale);

  const handleRowClick = (livestream: { _id: string; streamer: string; youtubeLink: string; status: string }) => {
    console.log('Clicked livestream:', livestream);
    alert(`Streamer: ${livestream.streamer}\nStatus: ${livestream.status}\nYouTube: ${livestream.youtubeLink}`);
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
    <div className="space-y-8">
      {/* Livestream Management */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <FaVideo className="mr-3 h-6 w-6 text-indigo-600" />
          {t.title}
        </h1>
        <div className="bg-white shadow-sm rounded-lg">
          <LiveStreamTable 
            apiData={apiData}
            locale={locale}
            onRowClick={handleRowClick}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>

      {/* React Query Example */}
      {/* <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t.reactQueryTitle}</h2>
        <QueryExample />
      </div> */}
    </div>
  );
} 