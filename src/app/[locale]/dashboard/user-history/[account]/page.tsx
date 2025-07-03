'use client';

import React from 'react';
import UserHistoryTable from '@/components/UserHistoryTable';
import Link from 'next/link';
import { FaArrowLeft, FaUserClock } from 'react-icons/fa';

// Mock data - in real app this would come from database based on account
const mockUserHistory = [
  { id: 1, action: 'Login', timestamp: new Date('2024-01-15T10:30:00'), details: 'User logged in from IP 192.168.1.100' },
  { id: 2, action: 'Payment', timestamp: new Date('2024-01-15T11:15:00'), details: 'Payment of 500,000 VND processed' },
  { id: 3, action: 'Profile Update', timestamp: new Date('2024-01-15T14:20:00'), details: 'Updated bank information' },
  { id: 4, action: 'Withdrawal', timestamp: new Date('2024-01-15T16:45:00'), details: 'Withdrawal request of 200,000 VND' },
  { id: 5, action: 'Logout', timestamp: new Date('2024-01-15T18:00:00'), details: 'User logged out' },
  { id: 6, action: 'Login', timestamp: new Date('2024-01-16T09:15:00'), details: 'User logged in from IP 192.168.1.101' },
  { id: 7, action: 'Transfer', timestamp: new Date('2024-01-16T10:30:00'), details: 'Transfer of 300,000 VND to account 1002' },
  { id: 8, action: 'Password Change', timestamp: new Date('2024-01-16T11:45:00'), details: 'Password updated successfully' },
  { id: 9, action: 'Payment', timestamp: new Date('2024-01-16T13:20:00'), details: 'Payment of 750,000 VND processed' },
  { id: 10, action: 'Profile Update', timestamp: new Date('2024-01-16T15:10:00'), details: 'Updated contact information' },
  { id: 11, action: 'Login', timestamp: new Date('2024-01-17T08:45:00'), details: 'User logged in from mobile app' },
  { id: 12, action: 'Deposit', timestamp: new Date('2024-01-17T12:30:00'), details: 'Deposit of 1,000,000 VND received' },
  { id: 13, action: 'Withdrawal', timestamp: new Date('2024-01-17T14:15:00'), details: 'Withdrawal request of 400,000 VND' },
  { id: 14, action: 'Security Alert', timestamp: new Date('2024-01-17T16:20:00'), details: 'Login attempt from unknown device blocked' },
  { id: 15, action: 'Logout', timestamp: new Date('2024-01-17T17:30:00'), details: 'User logged out from mobile app' },
  { id: 16, action: 'Login', timestamp: new Date('2024-01-18T09:00:00'), details: 'User logged in from IP 192.168.1.102' },
  { id: 17, action: 'Payment', timestamp: new Date('2024-01-18T11:30:00'), details: 'Payment of 250,000 VND processed' },
  { id: 18, action: 'Account Verification', timestamp: new Date('2024-01-18T13:45:00'), details: 'Account verification completed' },
  { id: 19, action: 'Transfer', timestamp: new Date('2024-01-18T15:20:00'), details: 'Transfer of 150,000 VND to account 1003' },
  { id: 20, action: 'Logout', timestamp: new Date('2024-01-18T18:00:00'), details: 'User logged out' },
];

// Simple translation function
function getTranslations(locale: string) {
  const translations = {
    en: {
      title: 'User History',
      backToUsers: 'Back to Users'
    },
    vi: {
      title: 'Lịch sử người dùng',
      backToUsers: 'Quay lại danh sách người dùng'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface UserHistoryPageProps {
  params: Promise<{ locale: string; account: string }>;
}

export default function UserHistoryPage({ params }: UserHistoryPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  const [account, setAccount] = React.useState<string>('');
  
  React.useEffect(() => {
    params.then(({ locale, account }) => {
      setLocale(locale);
      setAccount(account);
    });
  }, [params]);

  const t = getTranslations(locale);

  // Mock API data structure
  const mockApiData = {
    data: {
      success: true,
      result: {
        data: mockUserHistory,
        total: mockUserHistory.length,
        totalPages: Math.ceil(mockUserHistory.length / 10),
        page: 1,
        limit: 10
      }
    },
    isLoading: false,
    error: null
  };

  const handleRowClick = (historyItem: { id: number; action: string; details: string }) => {
    console.log('Clicked history item:', historyItem);
    alert(`Action: ${historyItem.action}\nDetails: ${historyItem.details}`);
  };

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
    // In a real app, this would trigger an API call
  };

  const handlePageSizeChange = (pageSize: number) => {
    console.log('Page size changed to:', pageSize);
    // In a real app, this would trigger an API call
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <FaUserClock className="mr-3 h-6 w-6 text-indigo-600" />
          {t.title} - Account #{account}
        </h1>
        <Link
          href={`/${locale}/dashboard/users`}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <FaArrowLeft className="-ml-1 mr-2 h-5 w-5" />
          {t.backToUsers}
        </Link>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg">
        <UserHistoryTable 
          apiData={mockApiData}
          locale={locale}
          onRowClick={handleRowClick}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
}

// Generate static params for supported locales and common account examples
export async function generateStaticParams() {
  const locales = ['en', 'vi'];
  const accounts = ['user1', 'user2', 'admin']; // Add common account examples
  
  const params = [];
  for (const locale of locales) {
    for (const account of accounts) {
      params.push({ locale, account });
    }
  }
  return params;
} 