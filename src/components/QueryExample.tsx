'use client';

import { useUsers } from '@/lib/hooks/useUsers';
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

export default function QueryExample() {
  const { data: session, status } = useSession();
  const apiData = useUsers();

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
        <p className="text-yellow-800">Please log in to view user data.</p>
      </div>
    );
  }

  // Define columns for the DataTable
  const columns = [
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
    {
      key: '_id' as keyof User,
      label: 'ID',
      sortable: false,
      render: (value: unknown) => (
        <span className="text-xs text-gray-500 font-mono">
          {String(value).slice(-8)}
        </span>
      ),
    },
  ];

  const handleRowClick = (user: User) => {
    console.log('Clicked user:', user);
    alert(`Clicked on user: ${user.account} (${user.bank})`);
  };

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">React Query API Example</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">
            Authenticated as: {session?.user?.name || 'Unknown User'}
          </span>
        </div>
      </div>

      {/* DataTable with API Integration */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-900">
            Enhanced DataTable with API Integration
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Automatic loading, error handling, and pagination from API response
          </p>
        </div>
        
        <DataTable
          apiData={transformedApiData}
          columns={columns}
          onRowClick={handleRowClick}
          showPageSizeSelector={true}
          pageSizeOptions={[5, 10, 20, 50]}
          onPageChange={(page) => console.log('Page changed to:', page)}
          onPageSizeChange={(size) => console.log('Page size changed to:', size)}
        />
      </div>

      {/* Features List */}
      <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-lg">
        <strong>Enhanced DataTable Features:</strong>
        <ul className="mt-2 space-y-1 grid grid-cols-1 md:grid-cols-2 gap-1">
          <li>• ✅ Automatic loading states with spinner</li>
          <li>• ✅ Error handling with retry button</li>
          <li>• ✅ Empty state handling</li>
          <li>• ✅ API response structure support</li>
          <li>• ✅ Server-side pagination (when supported)</li>
          <li>• ✅ Client-side pagination fallback</li>
          <li>• ✅ Sorting with visual indicators</li>
          <li>• ✅ Page size selector</li>
          <li>• ✅ Row click handling</li>
          <li>• ✅ Responsive design</li>
          <li>• ✅ Custom column rendering</li>
          <li>• ✅ TypeScript type safety</li>
        </ul>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <strong>API Response Structure:</strong>
          <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`{
  "data": {
    "success": true,
    "result": {
      "data": [
        {
          "_id": "685f79274a17621ad94773aa",
          "account": "6666",
          "bank": "VCB",
          "amount": 9500,
          "__v": 0
        }
      ],
      "total": 1,
      "totalPages": 1,
      "page": 1,
      "limit": 10
    }
  },
  "isLoading": false,
  "error": null
}`}
          </pre>
        </div>
      </div>
    </div>
  );
} 