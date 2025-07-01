'use client';

import React from 'react';
import { DataTable, Column } from './ui/Table';
import { Badge } from './ui/Badge';

// Updated Transaction interface to match API response
interface Transaction extends Record<string, unknown> {
  _id: string;
  amount: number;
  status: string;
  message: string;
  type: string;
  time: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// API Response type to match useTransactions hook
interface TransactionApiResponse {
  success: boolean;
  result?: {
    data?: Transaction[];
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
}

interface TransactionsTableProps {
  apiData: {
    data: TransactionApiResponse | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  locale?: string;
  onRowClick?: (transaction: Transaction) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      id: 'ID',
      message: 'Message',
      amount: 'Amount',
      status: 'Status',
      type: 'Type',
      time: 'Time',
      createdAt: 'Created'
    },
    vi: {
      id: 'ID',
      message: 'Tin nhắn',
      amount: 'Số tiền',
      status: 'Trạng thái',
      type: 'Loại',
      time: 'Thời gian',
      createdAt: 'Ngày tạo'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default function TransactionsTable({ 
  apiData, 
  locale = 'en',
  onRowClick,
  onPageChange,
  onPageSizeChange
}: Readonly<TransactionsTableProps>) {
  const t = getTranslations(locale);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'success';
      case 'pending':
      case 'processing':
        return 'warning';
      case 'failed':
      case 'error':
        return 'danger';
      case 'unknown':
      case 'unknow': // Handle typo in API
        return 'default';
      default:
        return 'default';
    }
  };

  const getTypeVariant = (type: string): 'primary' | 'secondary' | 'success' | 'warning' | 'default' => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return 'success';
      case 'withdrawal':
        return 'warning';
      case 'transfer':
        return 'primary';
      case 'payment':
        return 'primary';
      case 'refund':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const columns: Column<Transaction>[] = [
    {
      key: '_id' as keyof Transaction,
      label: t.id,
      sortable: false,
      render: (_value: unknown, _item: Transaction, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    
    {
      key: 'amount' as keyof Transaction,
      label: t.amount,
      sortable: true,
      render: (value: unknown) => {
        const amount = value as number;
        return (
          <span className={amount < 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
            {formatCurrency(amount)}
          </span>
        );
      }
    },
    {
      key: 'status' as keyof Transaction,
      label: t.status,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={getStatusVariant(value as string)}>
          {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </Badge>
      )
    },
    {
      key: 'type' as keyof Transaction,
      label: t.type,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={getTypeVariant(value as string)}>
          {String(value).charAt(0).toUpperCase() + String(value).slice(1)}
        </Badge>
      )
    },
    {
      key: 'message' as keyof Transaction,
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
      key: 'time' as keyof Transaction,
      label: t.time,
      sortable: true,
      render: (value: unknown) => (
        <span className="text-gray-500 text-sm">
          {formatDateTime(value as string)}
        </span>
      )
    },
    
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
    <DataTable
      apiData={transformedApiData}
      columns={columns}
      onRowClick={onRowClick}
      showPageSizeSelector={true}
      pageSizeOptions={[1, 2, 5, 10, 15, 20]}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      className="shadow-sm"
    />
  );
} 