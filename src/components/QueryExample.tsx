'use client';

import { useUsers } from '@/lib/hooks/useUsers';
import { useSession } from 'next-auth/react';
import { Spinner } from './ui/Spinner';
import { Button } from './ui/Button';

// Define user type based on expected API response
interface User {
  _id?: string;
  id?: string;
  userName?: string;
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
}

// Define API response type
interface ApiResponse {
  success: boolean;
  result?: {
    list?: User[];
  };
  error?: {
    status: number;
    code: string;
    message: string;
  };
}

export default function QueryExample() {
  const { data: session, status } = useSession();
  const { data: usersResponse, isLoading, error, refetch, isFetching } = useUsers();

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
        <span className="ml-3 text-gray-600">Loading users from API...</span>
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

  // Extract users from API response with proper typing
  const apiResponse = usersResponse as ApiResponse;
  const users: User[] = apiResponse?.success ? (apiResponse?.result?.list || []) : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">React Query API Example</h3>
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
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Data will automatically refresh every 15 minutes. 
              Last fetched: {new Date().toLocaleTimeString()}
            </p>
            <p className="text-xs text-gray-500">
              Authenticated as: {session?.user?.name || 'Unknown User'}
            </p>
          </div>
        </div>
        
        {users.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            No users found
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {users.map((user: User, index: number) => (
              <div key={user._id || index} className="px-4 py-3 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.userName || user.name || `User ${index + 1}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.email || user.phone || 'No contact info'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      ID: {user._id || user.id || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <strong>React Query Features:</strong>
        <ul className="mt-1 space-y-1">
          <li>• ✅ Automatic authentication handling</li>
          <li>• ✅ Centralized token management</li>
          <li>• ✅ Automatic background refetching every 15 minutes</li>
          <li>• ✅ Caching with smart invalidation</li>
          <li>• ✅ Loading, error, and retry states</li>
          <li>• ✅ Retry on failure (3 attempts)</li>
          <li>• ✅ Refetch on window focus and network reconnect</li>
        </ul>
        
        <div className="mt-3 pt-2 border-t border-gray-200">
          <strong>API Response:</strong>
          <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(usersResponse, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 