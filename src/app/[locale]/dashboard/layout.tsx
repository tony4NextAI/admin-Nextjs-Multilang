import DashboardNav from '@/components/DashboardNav';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import WelcomeUser from "@/components/WelcomeUser";
import { getServerSession } from "next-auth/next";
import { redirect } from 'next/navigation';


export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await getServerSession();

  
  if (!session) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col h-full fixed inset-y-0 left-0 z-20">
        <div className="px-6 border-b border-gray-200" style={{ paddingTop: '1.3rem', paddingBottom: '1.3rem' }}>
          <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <DashboardNav locale={locale} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              <WelcomeUser locale={locale} />
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