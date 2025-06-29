'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  FaUsers, 
  FaExchangeAlt, 
  FaChartLine, 
  FaHistory, 
  FaVideo,
  FaSignOutAlt 
} from 'react-icons/fa';

interface DashboardNavProps {
  locale: string;
}

// Simple translation function
function getTranslations(locale: string) {
  const translations = {
    en: {
      users: 'Users',
      transactions: 'Transactions',
      predicts: 'Predictions',
      balanceHistory: 'Balance History',
      livestream: 'Livestream',
      logout: 'Logout'
    },
    vi: {
      users: 'Người dùng',
      transactions: 'Giao dịch',
      predicts: 'Dự đoán',
      balanceHistory: 'Lịch sử số dư',
      livestream: 'Phát trực tiếp',
      logout: 'Đăng xuất'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default function DashboardNav({ locale }: Readonly<DashboardNavProps>) {
  const pathname = usePathname();
  const t = getTranslations(locale);

  const navItems = [
    { href: `/${locale}/dashboard/users`, label: t.users, key: 'users', icon: FaUsers },
    { href: `/${locale}/dashboard/transactions`, label: t.transactions, key: 'transactions', icon: FaExchangeAlt },
    { href: `/${locale}/dashboard/predicts`, label: t.predicts, key: 'predicts', icon: FaChartLine },
    { href: `/${locale}/dashboard/balance-history`, label: t.balanceHistory, key: 'balanceHistory', icon: FaHistory },
    { href: `/${locale}/dashboard/livestream`, label: t.livestream, key: 'livestream', icon: FaVideo },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="flex flex-col h-full py-6">
      <div className="flex-1">
        <div className="px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-indigo-100 text-indigo-700 border-r-2 border-indigo-500'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="px-4">
          <button
            onClick={() => signOut({ callbackUrl: `/${locale}/login` })}
            className="flex items-center w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            {t.logout}
          </button>
        </div>
      </div>
    </nav>
  );
} 