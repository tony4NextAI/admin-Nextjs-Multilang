import LoginForm from '@/components/LoginForm';

// Simple translation function
function getTitle(locale: string) {
  const translations = {
    en: 'Admin Login',
    vi: 'Đăng nhập'
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const title = getTitle(locale);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
} 