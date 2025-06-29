'use client';

import React from 'react';
import { DataTable, Column } from './ui/Table';
import { Badge } from './ui/Badge';

// Define the LiveStream type based on the API response
export interface LiveStream extends Record<string, unknown> {
  _id: string;
  youtubeLink: string;
  streamer: string;
  startTime: string;
  endTime: string;
  users: Array<unknown>;
  totalPlay: number;
  total: number;
  result: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v?: number;
}

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      id: 'ID',
      streamer: 'Streamer',
      youtubeLink: 'YouTube Link',
      duration: 'Duration',
      totalPlay: 'Total Play',
      total: 'Total Amount',
      result: 'Result',
      status: 'Status',
      createdAt: 'Created At'
    },
    vi: {
      id: 'ID',
      streamer: 'Người phát',
      youtubeLink: 'Link YouTube',
      duration: 'Thời lượng',
      totalPlay: 'Tổng lượt chơi',
      total: 'Tổng tiền',
      result: 'Kết quả',
      status: 'Trạng thái',
      createdAt: 'Ngày tạo'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

// Format currency in Vietnamese dong
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date and time
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// Calculate duration between start and end time
const formatDuration = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end.getTime() - start.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export interface LiveStreamTableProps {
  apiData: {
    data?: {
      success: boolean;
      result?: {
        data?: LiveStream[];
        total?: number;
        totalPages?: number;
        page?: number;
        limit?: number;
      };
      error?: {
        status: number;
        code: string;
        message: string;
      };
    };
    isLoading: boolean;
    error: Error | null;
  };
  locale?: string;
  onRowClick?: (liveStream: LiveStream) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function LiveStreamTable({
  apiData,
  locale = 'en',
  onRowClick,
  onPageChange,
  onPageSizeChange
}: Readonly<LiveStreamTableProps>) {
  const t = getTranslations(locale);

  const columns: Column<LiveStream>[] = [
    {
      key: 'id' as keyof LiveStream,
      label: t.id,
      sortable: false,
      render: (_value: unknown, _item: LiveStream, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'streamer' as keyof LiveStream,
      label: t.streamer,
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">{value as string}</span>
      )
    },
    {
      key: 'youtubeLink' as keyof LiveStream,
      label: t.youtubeLink,
      sortable: false,
      render: (value: unknown) => {
        const url = value as string;
        const videoId = getYouTubeVideoId(url);
        return (
          <div className="flex items-center space-x-2">
            {videoId && (
              <img 
                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                alt="YouTube thumbnail"
                className="w-16 h-12 object-cover rounded"
              />
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-xs"
              title={url}
            >
              {url.length > 30 ? `${url.substring(0, 30)}...` : url}
            </a>
          </div>
        );
      },
      className: 'min-w-64'
    },
    {
      key: 'startTime' as keyof LiveStream,
      label: t.duration,
      sortable: true,
      render: (value: unknown, item: LiveStream) => (
        <span className="text-gray-700">
          {formatDuration(value as string, item.endTime as string)}
        </span>
      )
    },
    {
      key: 'totalPlay' as keyof LiveStream,
      label: t.totalPlay,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant="info">
          {(value as number).toLocaleString()} plays
        </Badge>
      )
    },
    {
      key: 'total' as keyof LiveStream,
      label: t.total,
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-green-600">
          {formatCurrency(value as number)}
        </span>
      )
    },
    {
      key: 'result' as keyof LiveStream,
      label: t.result,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={Number(value) === 1 ? 'success' : 'warning'}>
          {Number(value) === 1 ? 'Thắng' : 'Thua'}
        </Badge>
      )
    },
    {
      key: 'status' as keyof LiveStream,
      label: t.status,
      sortable: true,
      render: (value: unknown) => {
        const status = value as string;
        
        // Define progress based on status
        const getProgress = (status: string) => {
          switch (status) {
            case 'progress': return { percent: 75, color: 'bg-blue-500', text: 'Đang tiến hành', animated: true };
            case 'completed': return { percent: 100, color: 'bg-green-500', text: 'Hoàn thành', animated: false };
            default: return { percent: 0, color: 'bg-gray-500', text: status, animated: true };
          }
        };
        
        const progress = getProgress(status);
        
        return (
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-700">{progress.text}</span>
              <span className="text-xs text-gray-500">{progress.percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${progress.color} ${
                  progress.animated ? 'progress-stripes' : ''
                }`}
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        );
      },
      className: 'min-w-32'
    },
    {
      key: 'createdAt' as keyof LiveStream,
      label: t.createdAt,
      sortable: true,
      render: (value: unknown) => (
        <span className="text-gray-400 text-xs">
          {formatDateTime(value as string)}
        </span>
      )
    }
  ];

  // Transform the data to match DataTable expected format
  const transformedApiData = {
    data: apiData.data ? {
      success: apiData.data.success,
      result: apiData.data.result
    } : null,
    isLoading: apiData.isLoading,
    error: apiData.error
  };

  return (
    <DataTable<LiveStream>
      columns={columns}
      apiData={transformedApiData}
      onRowClick={onRowClick}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
} 