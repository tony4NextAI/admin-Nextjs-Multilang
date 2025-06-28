import UserHistoryTable from '@/components/UserHistoryTable';
import Link from 'next/link';

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

export default async function UserHistoryPage({ 
  params
}: { 
  params: Promise<{ locale: string; account: string }> 
}) {
  const { locale, account } = await params;
  const t = getTranslations(locale);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t.title} - Account #{account}
        </h1>
        <Link
          href={`/${locale}/dashboard/users`}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t.backToUsers}
        </Link>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg">
        <UserHistoryTable history={mockUserHistory} locale={locale} />
      </div>
    </div>
  );
} 