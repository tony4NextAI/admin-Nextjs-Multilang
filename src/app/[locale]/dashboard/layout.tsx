import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DashboardNav from '@/components/DashboardNav';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <DashboardNav locale={locale} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome, {session.user?.name}
            </h2>
            <LanguageSwitcher locale={locale} />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 