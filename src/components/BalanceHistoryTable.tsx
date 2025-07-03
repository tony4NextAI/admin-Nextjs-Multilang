'use client';

import React from 'react';
import { DataTable, Column } from './ui/Table';
import { Badge } from './ui/Badge';

// Define the BalanceHistory type based on the API response
export interface BalanceHistory extends Record<string, unknown> {
  _id: string;
  userId: {
    _id: string;
    account: string;
    bank: string;
  };
  amount: number;
  status: "success" | "failed" | "unknow" | "pending";
  type: "win" | "play";
  createdAt: string;
  updatedAt: string;
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
      status: 'Status',
      type: 'Type',
      createdAt: 'Created At'
    },
    vi: {
      id: 'ID',
      account: 'Tài khoản',
      bank: 'Ngân hàng',
      amount: 'Số tiền',
      status: 'Trạng thái',
      type: 'Loại',
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

export interface BalanceHistoryTableProps {
  apiData: {
    data?: {
      success: boolean;
      result?: {
        data?: BalanceHistory[];
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
  onRowClick?: (balanceHistory: BalanceHistory) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function BalanceHistoryTable({
  apiData,
  locale = 'en',
  onRowClick,
  onPageChange,
  onPageSizeChange
}: Readonly<BalanceHistoryTableProps>) {
  const t = getTranslations(locale);

  const columns: Column<BalanceHistory>[] = [
    {
      key: '_id' as keyof BalanceHistory,
      label: t.id,
      sortable: false,
      render: (_value: unknown, _item: BalanceHistory, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'userId' as keyof BalanceHistory,
      label: t.account,
      sortable: true,
      render: (value: unknown) => {
        const userId = value as BalanceHistory['userId'];
        return (
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{userId.account}</span>
            <span className="text-sm text-gray-500">{userId.bank}</span>
          </div>
        );
      }
    },
    {
      key: 'amount' as keyof BalanceHistory,
      label: t.amount,
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-green-600">
          {formatCurrency(value as number)}
        </span>
      )
    },
    {
      key: 'type' as keyof BalanceHistory,
      label: t.type,
      sortable: true,
      render: (value: unknown) => {
        const type = value as string;
        return (
          <Badge variant={
            type === 'win' ? 'success' : 
            type === 'play' ? 'warning' : 
            'secondary'
          }>
            {type}
          </Badge>
        );
      }
    },
    {
      key: 'status' as keyof BalanceHistory,
      label: t.status,
      sortable: true,
      render: (value: unknown) => {
        const status = value as string;
        return (
          <Badge variant={
            status === 'success' ? 'success' : 
            status === 'pending' ? 'warning' : 
            status === 'failed' ? 'danger' :
            'secondary'
          }>
            {status === 'success' ? 'Thành công' :
             status === 'pending' ? 'Đang xử lý' :
             status === 'failed' ? 'Thất bại' :
             status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      }
    },
    {
      key: 'createdAt' as keyof BalanceHistory,
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
    <DataTable<BalanceHistory>
      columns={columns}
      apiData={transformedApiData}
      onRowClick={onRowClick}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      enableClientSidePagination={true}
      showPageSizeSelector={true}
      pageSizeOptions={[5, 10, 15, 20]}
      className="shadow-sm"
    />
  );
} 