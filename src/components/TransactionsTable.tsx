'use client';

import { DataTable } from '@/components/ui';
import { Badge } from '@/components/ui';

interface Transaction extends Record<string, unknown> {
  id: number;
  message: string;
  amount: number;
  status: string;
  type: string;
  note: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  locale?: string;
}

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      id: 'ID',
      message: 'Message',
      amount: 'Amount',
      status: 'Status',
      type: 'Type',
      note: 'Note'
    },
    vi: {
      id: 'ID',
      message: 'Tin nhắn',
      amount: 'Số tiền',
      status: 'Trạng thái',
      type: 'Loại',
      note: 'Ghi chú'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default function TransactionsTable({ transactions, locale = 'en' }: TransactionsTableProps) {
  const t = getTranslations(locale);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getTypeVariant = (type: string): 'primary' | 'secondary' | 'success' | 'warning' | 'default' => {
    switch (type) {
      case 'payment':
        return 'primary';
      case 'refund':
        return 'secondary';
      case 'subscription':
        return 'primary';
      case 'bonus':
        return 'success';
      case 'fee':
        return 'warning';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      key: 'id' as keyof Transaction,
      label: t.id,
      sortable: true,
      render: (value: unknown) => (
        <span className="font-medium text-gray-900">#{value as number}</span>
      )
    },
    {
      key: 'message' as keyof Transaction,
      label: t.message,
      sortable: true,
      render: (value: unknown) => (
        <span className="text-gray-500 max-w-xs truncate block" title={value as string}>
          {value as string}
        </span>
      ),
      className: 'max-w-xs'
    },
    {
      key: 'amount' as keyof Transaction,
      label: t.amount,
      sortable: true,
      render: (value: unknown) => {
        const amount = value as number;
        return (
          <span className={amount < 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
            {formatCurrency(amount)}
          </span>
        );
      }
    },
    {
      key: 'status' as keyof Transaction,
      label: t.status,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={getStatusVariant(value as string)}>
          {value as string}
        </Badge>
      )
    },
    {
      key: 'type' as keyof Transaction,
      label: t.type,
      sortable: true,
      render: (value: unknown) => (
        <Badge variant={getTypeVariant(value as string)}>
          {value as string}
        </Badge>
      )
    },
    {
      key: 'note' as keyof Transaction,
      label: t.note,
      sortable: false,
      render: (value: unknown) => (
        <span className="text-gray-500 max-w-xs truncate block" title={value as string}>
          {value as string}
        </span>
      ),
      className: 'max-w-xs'
    }
  ];

  return (
    <DataTable
      data={transactions}
      columns={columns}
      itemsPerPage={10}
      showPageSizeSelector={true}
      pageSizeOptions={[5, 10, 15, 20]}
    />
  );
} 