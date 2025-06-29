'use client';

import { useUsers } from '@/lib/hooks/useUsers';
import { Spinner } from './ui/Spinner';
import { Button } from './ui/Button';

export default function QueryExample() {
  const { data: users, isLoading, error, refetch, isFetching } = useUsers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
        <span className="ml-3 text-gray-600">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading users: {(error as Error).message}</p>
        <Button 
          onClick={() => refetch()} 
          variant="outline" 
          size="sm" 
          className="mt-2"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">React Query Example</h3>
        <Button 
          onClick={() => refetch()} 
          variant="outline" 
          size="sm"
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <Spinner size="sm" className="mr-2" />
              Refreshing...
            </>
          ) : (
            'Refresh Data'
          )}
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Data will automatically refresh every 15 minutes. 
            Last fetched: {new Date().toLocaleTimeString()}
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {users?.map((user) => (
            <div key={user.id} className="px-4 py-3 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{user.account}</p>
                  <p className="text-sm text-gray-500">{user.bank}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {user.amount.toLocaleString('vi-VN')} VND
                  </p>
                  <p className="text-sm text-gray-500">{user.createdAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <strong>React Query Features:</strong>
        <ul className="mt-1 space-y-1">
          <li>• Automatic background refetching every 15 minutes</li>
          <li>• Caching with smart invalidation</li>
          <li>• Loading and error states</li>
          <li>• Retry on failure (3 attempts)</li>
          <li>• Refetch on window focus and network reconnect</li>
        </ul>
      </div>
    </div>
  );
} 