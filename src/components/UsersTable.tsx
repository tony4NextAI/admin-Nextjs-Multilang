'use client';

import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { DataTable } from '@/components/ui';
import { useUsers } from '@/lib/hooks/useUsers';

interface User extends Record<string, unknown> {
  account: number;
  bank: string;
  amount: number;
  created: Date;
}

interface UsersTableProps {
  locale: string;
}

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      account: 'Account',
      bank: 'Bank',
      amount: 'Amount',
      created: 'Created'
    },
    vi: {
      account: 'Tài khoản',
      bank: 'Ngân hàng',
      amount: 'Số tiền',
      created: 'Ngày tạo'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default function UsersTable({  locale }: Readonly<UsersTableProps>) {
  const t = getTranslations(locale);
  const router = useRouter();

  const users = useUsers();

  console.log('====================================');
  console.log({users});
  console.log('====================================');

  const handleRowClick = (user: User) => {
    router.push(`/${locale}/dashboard/user-history/${user.account}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const columns = [
    {
      key: 'account' as keyof User,
      label: t.account,
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">{value as number}</span>
      )
    },
    {
      key: 'bank' as keyof User,
      label: t.bank,
      sortable: true,
      render: (value: unknown) => (
        <span className="text-gray-500">{value as string}</span>
      )
    },
    {
      key: 'amount' as keyof User,
      label: t.amount,
      sortable: true,
      render: (value: unknown) => (
        <span className="text-gray-500">{formatCurrency(value as number)}</span>
      )
    },
    {
      key: 'created' as keyof User,
      label: t.created,
      sortable: true,
      render: (value: unknown) => (
        <span className="text-gray-500">{dayjs(value as Date).format('DD/MM/YYYY')}</span>
      )
    }
  ];

  return (
    <DataTable
      data={[]}
      columns={columns}
      onRowClick={handleRowClick}
      itemsPerPage={10}
      showPageSizeSelector={true}
      pageSizeOptions={[5, 10, 15, 20]}
    />
  );
} 