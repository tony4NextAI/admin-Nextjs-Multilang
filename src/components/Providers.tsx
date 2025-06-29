'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  // Create a new QueryClient instance with 15-minute stale time
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Data is considered fresh for 15 minutes (900,000 ms)
        staleTime: 15 * 60 * 1000, // 15 minutes
        // Cache data for 20 minutes (longer than stale time)
        gcTime: 20 * 60 * 1000, // 20 minutes (was cacheTime in v4)
        // Retry failed requests 3 times
        retry: 3,
        // Refetch on window focus
        refetchOnWindowFocus: true,
        // Refetch on network reconnect
        refetchOnReconnect: true,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        {children}
      </SessionProvider>
      {/* React Query DevTools - only shows in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
} 