import LoginForm from '@/components/LoginForm';

// Simple translation function
function getTitle(locale: string) {
  const translations = {
    en: 'Admin Login',
    vi: 'Đăng nhập'
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

// Generate static params for supported locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'vi' }
  ];
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = getTitle(locale);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-background">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white drop-shadow-lg">
            {title}
          </h2>
        </div>
        <LoginForm locale={locale} />
      </div>
    </div>
  );
} 