'use client';

import React from 'react';
import TransactionsTable from '@/components/TransactionsTable';

// Mock data - in real app this would come from database
const mockTransactions = [
  { 
    id: 1, 
    message: 'Payment for order #12345', 
    amount: 500000, 
    status: 'completed', 
    type: 'payment', 
    note: 'Customer payment processed successfully' 
  },
  { 
    id: 2, 
    message: 'Refund for order #12344', 
    amount: -150000, 
    status: 'pending', 
    type: 'refund', 
    note: 'Refund request under review' 
  },
  { 
    id: 3, 
    message: 'Subscription renewal', 
    amount: 299000, 
    status: 'completed', 
    type: 'subscription', 
    note: 'Monthly subscription renewed' 
  },
  { 
    id: 4, 
    message: 'Bonus payment', 
    amount: 1000000, 
    status: 'failed', 
    type: 'bonus', 
    note: 'Payment failed due to insufficient funds' 
  },
  { 
    id: 5, 
    message: 'Service fee', 
    amount: 75000, 
    status: 'completed', 
    type: 'fee', 
    note: 'Service fee charged successfully' 
  },
  { 
    id: 6, 
    message: 'Payment for order #12346', 
    amount: 750000, 
    status: 'completed', 
    type: 'payment', 
    note: 'Payment processed via credit card' 
  },
  { 
    id: 7, 
    message: 'Withdrawal request', 
    amount: -200000, 
    status: 'pending', 
    type: 'withdrawal', 
    note: 'Withdrawal to bank account pending' 
  },
  { 
    id: 8, 
    message: 'Commission payment', 
    amount: 125000, 
    status: 'completed', 
    type: 'commission', 
    note: 'Affiliate commission paid' 
  },
  { 
    id: 9, 
    message: 'Refund for order #12347', 
    amount: -89000, 
    status: 'completed', 
    type: 'refund', 
    note: 'Refund processed successfully' 
  },
  { 
    id: 10, 
    message: 'Premium subscription', 
    amount: 599000, 
    status: 'completed', 
    type: 'subscription', 
    note: 'Premium plan activated' 
  },
  { 
    id: 11, 
    message: 'Payment for order #12348', 
    amount: 1200000, 
    status: 'failed', 
    type: 'payment', 
    note: 'Payment declined by bank' 
  },
  { 
    id: 12, 
    message: 'Processing fee', 
    amount: 35000, 
    status: 'completed', 
    type: 'fee', 
    note: 'Transaction processing fee' 
  },
  { 
    id: 13, 
    message: 'Cashback reward', 
    amount: 45000, 
    status: 'completed', 
    type: 'bonus', 
    note: 'Cashback from recent purchases' 
  },
  { 
    id: 14, 
    message: 'Payment for order #12349', 
    amount: 890000, 
    status: 'pending', 
    type: 'payment', 
    note: 'Payment authorization pending' 
  },
  { 
    id: 15, 
    message: 'Annual subscription', 
    amount: 2400000, 
    status: 'completed', 
    type: 'subscription', 
    note: 'Annual plan renewed automatically' 
  },
  { 
    id: 16, 
    message: 'Withdrawal request', 
    amount: -500000, 
    status: 'completed', 
    type: 'withdrawal', 
    note: 'Funds transferred to bank account' 
  },
  { 
    id: 17, 
    message: 'Late payment fee', 
    amount: 50000, 
    status: 'completed', 
    type: 'fee', 
    note: 'Late payment penalty applied' 
  },
  { 
    id: 18, 
    message: 'Referral bonus', 
    amount: 100000, 
    status: 'completed', 
    type: 'bonus', 
    note: 'Bonus for successful referral' 
  },
];

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Transactions'
    },
    vi: {
      title: 'Giao dịch'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

interface TransactionsPageProps {
  params: Promise<{ locale: string }>;
}

export default function TransactionsPage({ params }: TransactionsPageProps) {
  const [locale, setLocale] = React.useState<string>('en');
  
  React.useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  const t = getTranslations(locale);

  // Mock API data structure
  const mockApiData = {
    data: {
      success: true,
      result: {
        data: mockTransactions,
        total: mockTransactions.length,
        totalPages: Math.ceil(mockTransactions.length / 10),
        page: 1,
        limit: 10
      }
    },
    isLoading: false,
    error: null
  };

  const handleRowClick = (transaction: { id: number; message: string }) => {
    console.log('Clicked transaction:', transaction);
    alert(`Transaction #${transaction.id}: ${transaction.message}`);
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>
      <div className="bg-white shadow-sm rounded-lg">
        <TransactionsTable 
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