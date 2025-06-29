'use client';

import { DataTable } from './ui/Table';
import { Badge } from './ui/Badge';

interface User extends Record<string, unknown> {
  _id: string;
  account: string;
  bank: string;
  amount: number;
  __v?: number;
}

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
  onRowClick?: (user: User) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export default function UsersTable({ 
  apiData, 
  onRowClick, 
  onPageChange, 
  onPageSizeChange 
}: Readonly<UsersTableProps>) {
  const columns = [
    {
      key: '_id' as keyof User,
      label: 'ID',
      sortable: false,
      render: (value: unknown, row: User, index?: number) => (
        <span className="font-medium text-gray-900">
          #{(index ?? 0) + 1}
        </span>
      ),
    },
    {
      key: 'account' as keyof User,
      label: 'Account',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">{String(value)}</span>
      ),
    },
    {
      key: 'bank' as keyof User,
      label: 'Bank',
      sortable: true,
      render: (value: unknown) => (
        <Badge variant="secondary">{String(value)}</Badge>
      ),
    },
    {
      key: 'amount' as keyof User,
      label: 'Amount',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-semibold text-green-600">
          {Number(value).toLocaleString('vi-VN')} VND
        </span>
      ),
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
      columns={columns}
      onRowClick={onRowClick}
      apiData={transformedApiData}
      showPageSizeSelector={true}
      enableClientSidePagination={true}
      pageSizeOptions={[5, 10, 20, 50]}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      className="shadow-sm"
    />
  );
} 