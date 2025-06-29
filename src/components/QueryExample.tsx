'use client';

import React from 'react';
import { useUsers } from '@/lib/hooks/useUsers';
import { useTransactions } from '@/lib/hooks/useTransactions';
import { usePredicts } from '@/lib/hooks/usePredicts';
import { useBalanceHistory } from '@/lib/hooks/useBalanceHistory';
import { useLiveStream } from '@/lib/hooks/useLiveStream';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { DataTable, Column } from './ui/Table';

// User interface for the DataTable
interface User extends Record<string, unknown> {
  _id: string;
  account: string;
  bank: string;
  amount: number;
  __v?: number;
}

// Transaction interface for the DataTable
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

// Predict interface for the DataTable
interface Predict extends Record<string, unknown> {
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

// BalanceHistory interface for the DataTable
interface BalanceHistory extends Record<string, unknown> {
  _id: string;
  userId: {
    _id: string;
    account: string;
    bank: string;
  };
  amount: number;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// LiveStream interface for the DataTable
interface LiveStream extends Record<string, unknown> {
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

// Format currency in Vietnamese dong
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function QueryExample() {
  const usersData = useUsers();
  const transactionsData = useTransactions();
  const predictsData = usePredicts();
  const balanceHistoryData = useBalanceHistory();
  const liveStreamData = useLiveStream();

  // Transform all data to match DataTable expected format
  const transformedUsersData = {
    data: usersData.data ? {
      success: usersData.data.success,
      result: usersData.data.result
    } : null,
    isLoading: usersData.isLoading,
    error: usersData.error
  };

  const transformedTransactionsData = {
    data: transactionsData.data ? {
      success: transactionsData.data.success,
      result: transactionsData.data.result
    } : null,
    isLoading: transactionsData.isLoading,
    error: transactionsData.error
  };

  const transformedPredictsData = {
    data: predictsData.data ? {
      success: predictsData.data.success,
      result: predictsData.data.result
    } : null,
    isLoading: predictsData.isLoading,
    error: predictsData.error
  };

  const transformedBalanceHistoryData = {
    data: balanceHistoryData.data ? {
      success: balanceHistoryData.data.success,
      result: balanceHistoryData.data.result
    } : null,
    isLoading: balanceHistoryData.isLoading,
    error: balanceHistoryData.error
  };

  const transformedLiveStreamData = {
    data: liveStreamData.data ? {
      success: liveStreamData.data.success,
      result: liveStreamData.data.result
    } : null,
    isLoading: liveStreamData.isLoading,
    error: liveStreamData.error
  };

  // Define columns for Users table
  const userColumns: Column<User>[] = [
    {
      key: '_id' as keyof User,
      label: 'ID',
      sortable: false,
      render: (_value: unknown, _item: User, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'account' as keyof User,
      label: 'Account',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">{value as string}</span>
      )
    },
    {
      key: 'bank' as keyof User,
      label: 'Bank',
      sortable: true,
      render: (value: unknown) => (
        <Badge variant="info">{value as string}</Badge>
      )
    },
    {
      key: 'amount' as keyof User,
      label: 'Amount',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-green-600">
          {formatCurrency(value as number)}
        </span>
      )
    }
  ];

  // Define columns for Transactions table
  const transactionColumns: Column<Transaction>[] = [
    {
      key: '_id' as keyof Transaction,
      label: 'ID',
      sortable: false,
      render: (_value: unknown, _item: Transaction, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'type' as keyof Transaction,
      label: 'Type',
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={
          value === 'deposit' ? 'success' : 
          value === 'withdraw' ? 'danger' : 
          'warning'
        }>
          {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
        </Badge>
      )
    },
    {
      key: 'amount' as keyof Transaction,
      label: 'Amount',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-green-600">
          {formatCurrency(value as number)}
        </span>
      )
    },
    {
      key: 'status' as keyof Transaction,
      label: 'Status',
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={
          value === 'completed' ? 'success' : 
          value === 'pending' ? 'warning' : 
          'danger'
        }>
          {(value as string).charAt(0).toUpperCase() + (value as string).slice(1)}
        </Badge>
      )
    }
  ];

  // Define columns for Predicts table
  const predictColumns: Column<Predict>[] = [
    {
      key: 'id' as keyof Predict,
      label: 'ID',
      sortable: false,
      render: (_value: unknown, _item: Predict, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'userId' as keyof Predict,
      label: 'Account',
      sortable: true,
      render: (value: unknown) => {
        const userId = value as Predict['userId'];
        return (
          <span className="font-medium text-gray-900">{userId.account}</span>
        );
      }
    },
    {
      key: 'predict' as keyof Predict,
      label: 'Predict',
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={Number(value) === 1 ? 'success' : 'warning'}>
          {Number(value) === 1 ? 'Chẵn' : 'Lẻ'}
        </Badge>
      )
    },
    {
      key: 'isWin' as keyof Predict,
      label: 'Result',
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={value as boolean ? 'success' : 'danger'}>
          {value as boolean ? 'Win' : 'Loss'}
        </Badge>
      )
    },
    {
      key: 'amount' as keyof Predict,
      label: 'Amount',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-green-600">
          {formatCurrency(value as number)}
        </span>
      )
    }
  ];

  // Define columns for Balance History table
  const balanceHistoryColumns: Column<BalanceHistory>[] = [
    {
      key: '_id' as keyof BalanceHistory,
      label: 'ID',
      sortable: false,
      render: (_value: unknown, _item: BalanceHistory, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'userId' as keyof BalanceHistory,
      label: 'Account',
      sortable: true,
      render: (value: unknown) => {
        const userId = value as BalanceHistory['userId'];
        return (
          <span className="font-medium text-gray-900">{userId.account}</span>
        );
      }
    },
    {
      key: 'type' as keyof BalanceHistory,
      label: 'Type',
      sortable: true,
      render: (value: unknown) => {
        const type = value as string;
        return (
          <Badge variant={
            type === 'win' ? 'success' : 
            type === 'lose' ? 'danger' : 
            type === 'deposit' ? 'info' :
            type === 'withdraw' ? 'warning' :
            'secondary'
          }>
            {type === 'win' ? 'Win' : 
             type === 'lose' ? 'Loss' : 
             type === 'deposit' ? 'Deposit' :
             type === 'withdraw' ? 'Withdraw' :
             type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        );
      }
    },
    {
      key: 'status' as keyof BalanceHistory,
      label: 'Status',
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
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      }
    },
    {
      key: 'amount' as keyof BalanceHistory,
      label: 'Amount',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-green-600">
          {formatCurrency(value as number)}
        </span>
      )
    }
  ];

  // Define columns for LiveStream table
  const liveStreamColumns: Column<LiveStream>[] = [
    {
      key: 'id' as keyof LiveStream,
      label: 'ID',
      sortable: false,
      render: (_value: unknown, _item: LiveStream, index: number, currentPage: number, pageSize: number) => (
        <span className="font-medium text-gray-900">
          #{((currentPage - 1) * pageSize) + index + 1}
        </span>
      )
    },
    {
      key: 'streamer' as keyof LiveStream,
      label: 'Streamer',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">{value as string}</span>
      )
    },
    {
      key: 'status' as keyof LiveStream,
      label: 'Status',
      sortable: true,
      render: (value: unknown) => {
        const status = value as string;
        
        // Define progress based on status
        const getProgress = (status: string) => {
          switch (status) {
            case 'progress': return { percent: 75, color: 'bg-blue-500', text: 'In Progress' };
            case 'completed': return { percent: 100, color: 'bg-green-500', text: 'Completed' };
            default: return { percent: 0, color: 'bg-gray-500', text: status.charAt(0).toUpperCase() + status.slice(1) };
          }
        };
        
        const progress = getProgress(status);
        
        return (
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-700">{progress.text}</span>
              <span className="text-xs text-gray-500">{progress.percent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${progress.color}`}
                style={{ width: `${progress.percent}%` }}
              ></div>
            </div>
          </div>
        );
      }
    },
    {
      key: 'totalPlay' as keyof LiveStream,
      label: 'Total Play',
      sortable: true,
      render: (value: unknown) => (
        <Badge variant="info">
          {(value as number).toLocaleString()} plays
        </Badge>
      )
    },
    {
      key: 'total' as keyof LiveStream,
      label: 'Total Amount',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-green-600">
          {formatCurrency(value as number)}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">React Query Integration Demo</h1>
      
      {/* Users Section */}
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Users Data (useUsers Hook)</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Loading: {transformedUsersData.isLoading ? 'Yes' : 'No'}</span>
            <span>Error: {transformedUsersData.error ? 'Yes' : 'No'}</span>
            <span>Data Count: {transformedUsersData.data?.result?.data?.length || 0}</span>
            <span>Total: {transformedUsersData.data?.result?.total || 0}</span>
          </div>
        </div>
        
        <DataTable<User>
          columns={userColumns}
          apiData={transformedUsersData}
        />
      </Card>

      {/* Transactions Section */}
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Transactions Data (useTransactions Hook)</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Loading: {transformedTransactionsData.isLoading ? 'Yes' : 'No'}</span>
            <span>Error: {transformedTransactionsData.error ? 'Yes' : 'No'}</span>
            <span>Data Count: {transformedTransactionsData.data?.result?.data?.length || 0}</span>
            <span>Total: {transformedTransactionsData.data?.result?.total || 0}</span>
          </div>
        </div>
        
        <DataTable<Transaction>
          columns={transactionColumns}
          apiData={transformedTransactionsData}
        />
      </Card>

      {/* Predicts Section */}
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Predictions Data (usePredicts Hook)</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Loading: {transformedPredictsData.isLoading ? 'Yes' : 'No'}</span>
            <span>Error: {transformedPredictsData.error ? 'Yes' : 'No'}</span>
            <span>Data Count: {transformedPredictsData.data?.result?.data?.length || 0}</span>
            <span>Total: {transformedPredictsData.data?.result?.total || 0}</span>
          </div>
        </div>
        
        <DataTable<Predict>
          columns={predictColumns}
          apiData={transformedPredictsData}
        />
      </Card>

      {/* Balance History Section */}
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Balance History Data (useBalanceHistory Hook)</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Loading: {transformedBalanceHistoryData.isLoading ? 'Yes' : 'No'}</span>
            <span>Error: {transformedBalanceHistoryData.error ? 'Yes' : 'No'}</span>
            <span>Data Count: {transformedBalanceHistoryData.data?.result?.data?.length || 0}</span>
            <span>Total: {transformedBalanceHistoryData.data?.result?.total || 0}</span>
          </div>
        </div>
        
        <DataTable<BalanceHistory>
          columns={balanceHistoryColumns}
          apiData={transformedBalanceHistoryData}
        />
      </Card>

      {/* LiveStream Section */}
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Live Stream Data (useLiveStream Hook)</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Loading: {transformedLiveStreamData.isLoading ? 'Yes' : 'No'}</span>
            <span>Error: {transformedLiveStreamData.error ? 'Yes' : 'No'}</span>
            <span>Data Count: {transformedLiveStreamData.data?.result?.data?.length || 0}</span>
            <span>Total: {transformedLiveStreamData.data?.result?.total || 0}</span>
          </div>
        </div>
        
        <DataTable<LiveStream>
          columns={liveStreamColumns}
          apiData={transformedLiveStreamData}
        />
      </Card>

      {/* Debug Information */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Debug Information</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">Users Response:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(usersData.data, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Transactions Response:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(transactionsData.data, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Predicts Response:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(predictsData.data, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Balance History Response:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(balanceHistoryData.data, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Live Stream Response:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(liveStreamData.data, null, 2)}
            </pre>
          </div>
        </div>
      </Card>
    </div>
  );
} 