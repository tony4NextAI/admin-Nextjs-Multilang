'use client';

import { DataTable, Column } from './ui/Table';
import { Badge } from './ui/Badge';

interface User extends Record<string, unknown> {
  _id: string;
  account: string;
  bank: string;
  amount: number;
  __v?: number;
}

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      id: 'ID',
      account: 'Account',
      bank: 'Bank',
      amount: 'Amount'
    },
    vi: {
      id: 'ID',
      account: 'Tài khoản',
      bank: 'Ngân hàng',
      amount: 'Số tiền'
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

// API Response type to match useUsers hook
interface ApiResponse {
  success: boolean;
  result?: {
    data?: User[];
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

interface UsersTableProps {
  apiData: {
    data: ApiResponse | undefined;
    isLoading: boolean;
    error: Error | null;
  };
  locale?: string;
  onRowClick?: (user: User) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function UsersTable({ 
  apiData, 
  locale = 'en',
  onRowClick, 
  onPageChange, 
  onPageSizeChange 
}: Readonly<UsersTableProps>) {
  const t = getTranslations(locale);

  const columns: Column<User>[] = [
    {
      key: '_id' as keyof User,
      label: t.id,
      sortable: false,
      render: (_value: unknown, _item: User, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'account' as keyof User,
      label: t.account,
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">{value as string}</span>
      )
    },
    {
      key: 'bank' as keyof User,
      label: t.bank,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant="info">{value as string}</Badge>
      )
    },
    {
      key: 'amount' as keyof User,
      label: t.amount,
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-green-600">
          {formatCurrency(value as number)}
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
    <DataTable
      columns={columns}
      onRowClick={onRowClick}
      apiData={transformedApiData}
      showPageSizeSelector={true}
      enableClientSidePagination={true}
      pageSizeOptions={[1, 5, 10, 20, 50]}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      className="shadow-sm"
    />
  );
} 