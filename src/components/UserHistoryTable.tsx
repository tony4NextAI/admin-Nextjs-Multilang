'use client';

import React from 'react';
import dayjs from 'dayjs';
import { DataTable, Column } from './ui/Table';
import { Badge } from './ui/Badge';

interface HistoryItem extends Record<string, unknown> {
  id: number;
  action: string;
  timestamp: Date;
  details: string;
}

interface UserHistoryTableProps {
  apiData: {
    data: {
      success: boolean;
      result?: {
        data?: HistoryItem[];
        total?: number;
        totalPages?: number;
        page?: number;
        limit?: number;
      };
    } | null;
    isLoading: boolean;
    error: Error | null;
  };
  locale?: string;
  onRowClick?: (historyItem: HistoryItem) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      id: 'ID',
      action: 'Action',
      timestamp: 'Timestamp',
      details: 'Details'
    },
    vi: {
      id: 'ID',
      action: 'Hành động',
      timestamp: 'Thời gian',
      details: 'Chi tiết'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default function UserHistoryTable({ 
  apiData, 
  locale = 'en',
  onRowClick,
  onPageChange,
  onPageSizeChange
}: Readonly<UserHistoryTableProps>) {
  const t = getTranslations(locale);

  const getActionVariant = (action: string): 'success' | 'warning' | 'primary' | 'secondary' | 'default' | 'danger' | 'info' => {
    switch (action.toLowerCase()) {
      case 'login':
        return 'success';
      case 'logout':
        return 'default';
      case 'payment':
        return 'primary';
      case 'withdrawal':
        return 'warning';
      case 'profile update':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const columns: Column<HistoryItem>[] = [
    {
      key: 'id' as keyof HistoryItem,
      label: t.id,
      sortable: false,
      render: (_value: unknown, _item: HistoryItem, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'action' as keyof HistoryItem,
      label: t.action,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={getActionVariant(value as string)}>
          {value as string}
        </Badge>
      )
    },
    {
      key: 'timestamp' as keyof HistoryItem,
      label: t.timestamp,
      sortable: true,
      render: (value: unknown) => (
        <span className="text-gray-500">
          {dayjs(value as Date).format('DD/MM/YYYY HH:mm:ss')}
        </span>
      )
    },
    {
      key: 'details' as keyof HistoryItem,
      label: t.details,
      sortable: false,
      render: (value: unknown) => (
        <span className="text-gray-500 max-w-md block" title={value as string}>
          {value as string}
        </span>
      ),
      className: 'max-w-md'
    }
  ];

  return (
    <DataTable
      apiData={apiData}
      columns={columns}
      onRowClick={onRowClick}
      showPageSizeSelector={true}
      pageSizeOptions={[1, 5, 10, 15, 20]}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      className="shadow-sm"
    />
  );
} 