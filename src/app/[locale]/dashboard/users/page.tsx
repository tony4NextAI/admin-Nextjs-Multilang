import UsersTable from '@/components/UsersTable';

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
        <UsersTable  locale={locale} />
      </div>
    </div>
  );
} 