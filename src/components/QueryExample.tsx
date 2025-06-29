'use client';

import { useUsers } from '@/lib/hooks/useUsers';
import { useTransactions } from '@/lib/hooks/useTransactions';
import { useSession } from 'next-auth/react';
import { Spinner } from './ui/Spinner';
import { DataTable } from './ui/Table';
import { Badge } from './ui/Badge';

// Define user type based on expected API response
interface User {
  _id: string;
  account: string;
  bank: string;
  amount: number;
  __v?: number;
}

// Define transaction type based on expected API response
interface Transaction {
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

export default function QueryExample() {
  const { data: session, status } = useSession();
  const usersApiData = useUsers();
  const transactionsApiData = useTransactions();

  // Handle authentication states
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
        <span className="ml-3 text-gray-600">Checking authentication...</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">Please log in to view API data.</p>
      </div>
    );
  }

  // Define columns for the Users DataTable
  const userColumns = [
    {
      key: '_id' as keyof User,
      label: 'ID',
      sortable: false,
      render: (value: unknown, row: User, index?: number) => (
        <span className="font-medium text-gray-900">#{(index ?? 0) + 1}</span>
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

  // Define columns for the Transactions DataTable
  const transactionColumns = [
    {
      key: '_id' as keyof Transaction,
      label: 'ID',
      sortable: false,
      render: (value: unknown, row: Transaction, index?: number) => (
        <span className="font-medium text-gray-900">#{(index ?? 0) + 1}</span>
      ),
    },
    {
      key: 'type' as keyof Transaction,
      label: 'Type',
      sortable: true,
      render: (value: unknown) => (
        <Badge variant="primary">{String(value).charAt(0).toUpperCase() + String(value).slice(1)}</Badge>
      ),
    },
    {
      key: 'amount' as keyof Transaction,
      label: 'Amount',
      sortable: true,
      render: (value: unknown) => (
        <span className="font-semibold text-green-600">
          {Number(value).toLocaleString('vi-VN')} VND
        </span>
      ),
    },
    {
      key: 'status' as keyof Transaction,
      label: 'Status',
      sortable: true,
      render: (value: unknown) => {
        const status = String(value).toLowerCase();
        const variant = status === 'completed' || status === 'success' ? 'success' : 
                       status === 'pending' ? 'warning' : 'default';
        return (
          <Badge variant={variant}>{String(value).charAt(0).toUpperCase() + String(value).slice(1)}</Badge>
        );
      },
    },
  ];

  const handleUserClick = (user: User) => {
    console.log('Clicked user:', user);
    alert(`Clicked on user: ${user.account} (${user.bank})`);
  };

  const handleTransactionClick = (transaction: Transaction) => {
    console.log('Clicked transaction:', transaction);
    alert(`Transaction: ${transaction.type}\nAmount: ${transaction.amount.toLocaleString('vi-VN')} VND`);
  };

  // Transform the data to match DataTable expected format
  const transformedUsersData = {
    data: usersApiData.data ? {
      success: usersApiData.data.success,
      result: usersApiData.data.result
    } : null,
    isLoading: usersApiData.isLoading,
    error: usersApiData.error
  };

  const transformedTransactionsData = {
    data: transactionsApiData.data ? {
      success: transactionsApiData.data.success,
      result: transactionsApiData.data.result
    } : null,
    isLoading: transactionsApiData.isLoading,
    error: transactionsApiData.error
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">React Query API Examples</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Authenticated as: {session?.user?.name || 'Unknown User'}
          </span>
        </div>
      </div>

      {/* Users DataTable */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-900">
            Users API Integration (useUsers Hook)
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Real-time user data from API with automatic loading and error handling
          </p>
        </div>
        
        <DataTable
          apiData={transformedUsersData}
          columns={userColumns}
          onRowClick={handleUserClick}
          showPageSizeSelector={true}
          pageSizeOptions={[5, 10, 20]}
          onPageChange={(page) => console.log('Users page changed to:', page)}
          onPageSizeChange={(size) => console.log('Users page size changed to:', size)}
        />
      </div>

      {/* Transactions DataTable */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-900">
            Transactions API Integration (useTransactions Hook)
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Real-time transaction data from API with status indicators and formatting
          </p>
        </div>
        
        <DataTable
          apiData={transformedTransactionsData}
          columns={transactionColumns}
          onRowClick={handleTransactionClick}
          showPageSizeSelector={true}
          pageSizeOptions={[5, 10, 20]}
          onPageChange={(page) => console.log('Transactions page changed to:', page)}
          onPageSizeChange={(size) => console.log('Transactions page size changed to:', size)}
        />
      </div>

      {/* API Information */}
      <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <strong className="text-gray-700">useUsers Hook Features:</strong>
            <ul className="mt-2 space-y-1">
              <li>• ✅ User account data from API</li>
              <li>• ✅ Bank information display</li>
              <li>• ✅ Amount formatting (VND)</li>
              <li>• ✅ Automatic authentication</li>
              <li>• ✅ 15-minute cache revalidation</li>
            </ul>
          </div>
          
          <div>
            <strong className="text-gray-700">useTransactions Hook Features:</strong>
            <ul className="mt-2 space-y-1">
              <li>• ✅ Transaction history from API</li>
              <li>• ✅ Status indicators (badges)</li>
              <li>• ✅ Type classification</li>
              <li>• ✅ Date/time formatting</li>
              <li>• ✅ Amount display (VND)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <strong className="text-gray-700">API Endpoints:</strong>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                POST /api/admin/user/list
              </code>
              <p className="text-xs text-gray-600 mt-1">Users data endpoint</p>
            </div>
            <div>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                POST /api/admin/transaction/list
              </code>
              <p className="text-xs text-gray-600 mt-1">Transactions data endpoint</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 