'use client';

import React from 'react';
import { DataTable, Column } from './ui/Table';
import { Badge } from './ui/Badge';

// Define the Predict type based on the API response
export interface Predict extends Record<string, unknown> {
  _id: string;
  userId: {
    _id: string;
    account: string;
    bank: string;
  };
  amount: number;
  message: string;
  predict: number;
  streamId: number;
  isWin: boolean;
  isPaid: boolean;
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
      account: 'Account',
      bank: 'Bank',
      amount: 'Amount',
      message: 'Message',
      predict: 'Predict',
      streamId: 'Stream',
      isWin: 'Result',
      isPaid: 'Paid',
      createdAt: 'Created At'
    },
    vi: {
      id: 'ID',
      account: 'Tài khoản',
      bank: 'Ngân hàng',
      amount: 'Số tiền',
      message: 'Tin nhắn',
      predict: 'Dự đoán',
      streamId: 'Luồng',
      isWin: 'Kết quả',
      isPaid: 'Đã trả',
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

export interface PredictsTableProps {
  apiData: {
    data?: {
      success: boolean;
      result?: {
        data?: Predict[];
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
  onRowClick?: (predict: Predict) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function PredictsTable({
  apiData,
  locale = 'en',
  onRowClick,
  onPageChange,
  onPageSizeChange
}: Readonly<PredictsTableProps>) {
  const t = getTranslations(locale);

  const columns: Column<Predict>[] = [
    {
      key: 'id' as keyof Predict,
      label: t.id,
      sortable: false,
      render: (_value: unknown, _item: Predict, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'userId' as keyof Predict,
      label: t.account,
      sortable: true,
      render: (value: unknown) => {
        const userId = value as Predict['userId'];
        return (
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{userId.account}</span>
            <span className="text-sm text-gray-500">{userId.bank}</span>
          </div>
        );
      }
    },
    {
      key: 'amount' as keyof Predict,
      label: t.amount,
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-green-600">
          {formatCurrency(value as number)}
        </span>
      )
    },
    {
      key: 'predict' as keyof Predict,
      label: t.predict,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={Number(value) === 1 ? 'success' : 'warning'}>
          {Number(value) === 1 ? 'Thắng' : 'Thua'}
        </Badge>
      )
    },
    {
      key: 'streamId' as keyof Predict,
      label: t.streamId,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant="info">
          Stream {value as number}
        </Badge>
      )
    },
    {
      key: 'isWin' as keyof Predict,
      label: t.isWin,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={value as boolean ? 'success' : 'danger'}>
          {value as boolean ? 'Thắng' : 'Thua'}
        </Badge>
      )
    },
    {
      key: 'isPaid' as keyof Predict,
      label: t.isPaid,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={value as boolean ? 'success' : 'warning'}>
          {value as boolean ? 'Đã trả' : 'Chưa trả'}
        </Badge>
      )
    },
    {
      key: 'message' as keyof Predict,
      label: t.message,
      sortable: true,
      render: (value: unknown) => (
        <span className="text-gray-500 max-w-xs truncate block" title={value as string}>
          {value as string}
        </span>
      ),
      className: 'max-w-xs'
    },
    {
      key: 'createdAt' as keyof Predict,
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
    <DataTable<Predict>
      columns={columns}
      apiData={transformedApiData}
      onRowClick={onRowClick}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
} 