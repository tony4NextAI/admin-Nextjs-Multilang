'use client';

import React, { useState } from 'react';
import { useLiveStream } from '@/lib/hooks/useLiveStream';
import LiveStreamTable from '@/components/LiveStreamTable';
import CreateLiveStreamModal from '@/components/CreateLiveStreamModal';
import { Button } from '@/components/ui/Button';
import { FaVideo, FaPlus } from 'react-icons/fa';
// import QueryExample from '@/components/QueryExample';

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Livestream Management',
      createLive: 'Create Live',
      reactQueryTitle: 'React Query Demo',
      success: 'Livestream created successfully!',
      error: 'Failed to create livestream. Please try again.'
    },
    vi: {
      title: 'Quản lý phát trực tiếp',
      createLive: 'Tạo Live',
      reactQueryTitle: 'Demo React Query',
      success: 'Tạo livestream thành công!',
      error: 'Không thể tạo livestream. Vui lòng thử lại.'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface LivestreamPageProps {
  params: Promise<{ locale: string }>;
}

export default function LivestreamPage({ params }: LivestreamPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  // Use the updated useLiveStream hook with pagination support
  const { 
    data, 
    isLoading, 
    error, 
    changePage, 
    changePageSize, 
    queryParams,
    createLiveStream, 
    isCreating, 
    updateLiveStream,
    isUpdating
  } = useLiveStream();

  const t = getTranslations(locale);

  // Create apiData object in the expected format for LiveStreamTable
  const apiData = {
    data,
    isLoading,
    error,
  };

  const handleCreateLiveStream = (formData: {
    youtubeLink: string;
    streamer: string;
    startTime: string;
    endTime: string;
  }) => {
    createLiveStream(formData, {
      onSuccess: () => {
        setIsModalOpen(false);
        // You can add a toast notification here if you have one
        alert(t.success);
      },
      onError: (error) => {
        console.error('Failed to create livestream:', error);
        alert(t.error);
      }
    });
  };

  const handleUpdateResult = (id: number, result: number) => {
    const resultText = result === 2 ? 'Thắng' : 'Thua';
    if (confirm(`Bạn có chắc chắn muốn đặt kết quả "${resultText}" cho livestream này?`)) {
      updateLiveStream({ id, result }, {
        onSuccess: () => {
          alert(`Đã cập nhật kết quả thành "${resultText}" thành công!`);
        },
        onError: (error) => {
          console.error('Failed to update livestream result:', error);
          alert('Không thể cập nhật kết quả. Vui lòng thử lại.');
        }
      });
    }
  };

  const handleRowClick = (livestream: { _id: string; streamer: string; youtubeLink: string; status: string }) => {
    console.log('Clicked livestream:', livestream);
    console.log(`Streamer: ${livestream.streamer}\nStatus: ${livestream.status}\nYouTube: ${livestream.youtubeLink}`);
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
    <div className="space-y-8">
      {/* Livestream Management */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaVideo className="mr-3 h-6 w-6 text-indigo-600" />
            {t.title}
          </h1>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            {t.createLive}
          </Button>
        </div>
        
        {/* Display current pagination info */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Current Pagination:</strong> Page {queryParams.page} | Limit {queryParams.limit} items per page
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg">
          <LiveStreamTable 
            apiData={apiData}
            locale={locale}
            onRowClick={handleRowClick}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            onUpdateResult={handleUpdateResult}
            isUpdating={isUpdating}
          />
        </div>
      </div>

      {/* Create Live Stream Modal */}
      <CreateLiveStreamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateLiveStream}
        isLoading={isCreating}
        locale={locale}
      />

      {/* React Query Example */}
      {/* <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t.reactQueryTitle}</h2>
        <QueryExample />
      </div> */}
    </div>
  );
} 