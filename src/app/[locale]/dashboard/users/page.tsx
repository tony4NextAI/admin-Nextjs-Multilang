import UsersTable from '@/components/UsersTable';

// Mock data - in real app this would come from database
const mockUsers = [
  { account: 1001, bank: 'Vietcombank', amount: 1500000, created: new Date('2024-01-15') },
  { account: 1002, bank: 'BIDV', amount: 2300000, created: new Date('2024-01-14') },
  { account: 1003, bank: 'Techcombank', amount: 890000, created: new Date('2024-01-13') },
  { account: 1004, bank: 'MB Bank', amount: 3200000, created: new Date('2024-01-12') },
  { account: 1005, bank: 'VPBank', amount: 750000, created: new Date('2024-01-11') },
  { account: 1006, bank: 'ACB', amount: 1800000, created: new Date('2024-01-10') },
  { account: 1007, bank: 'Sacombank', amount: 950000, created: new Date('2024-01-09') },
  { account: 1008, bank: 'Vietinbank', amount: 2750000, created: new Date('2024-01-08') },
  { account: 1009, bank: 'HDBank', amount: 1200000, created: new Date('2024-01-07') },
  { account: 1010, bank: 'TPBank', amount: 680000, created: new Date('2024-01-06') },
  { account: 1011, bank: 'SHB', amount: 3400000, created: new Date('2024-01-05') },
  { account: 1012, bank: 'MSB', amount: 1650000, created: new Date('2024-01-04') },
  { account: 1013, bank: 'VIB', amount: 2100000, created: new Date('2024-01-03') },
  { account: 1014, bank: 'OCB', amount: 780000, created: new Date('2024-01-02') },
  { account: 1015, bank: 'LienVietPostBank', amount: 2900000, created: new Date('2024-01-01') },
  { account: 1016, bank: 'SeABank', amount: 1350000, created: new Date('2023-12-31') },
  { account: 1017, bank: 'BacABank', amount: 4200000, created: new Date('2023-12-30') },
  { account: 1018, bank: 'NamABank', amount: 850000, created: new Date('2023-12-29') },
  { account: 1019, bank: 'PGBank', amount: 1950000, created: new Date('2023-12-28') },
  { account: 1020, bank: 'KienLongBank', amount: 1100000, created: new Date('2023-12-27') },
];

// Simple translation function
function getTranslations(locale: string = 'en') {
  const translations = {
    en: {
      title: 'Users'
    },
    vi: {
      title: 'Người dùng'
    }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default async function UsersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.title}</h1>
      <div className="bg-white shadow-sm rounded-lg">
        <UsersTable users={mockUsers} locale={locale} />
      </div>
    </div>
  );
} 