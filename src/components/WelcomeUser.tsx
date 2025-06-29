'use client';
import { useSession } from 'next-auth/react';

interface WelcomeUserProps {
  locale: string;
}

function getTranslations(locale: string) {
  const translations = {
    en: { welcome: 'Welcome' },
    vi: { welcome: 'Chào mừng' }
  };
  return translations[locale as keyof typeof translations] || translations.en;
}

export default function WelcomeUser({ locale }: WelcomeUserProps) {
  const { data: session, status } = useSession();
  const t = getTranslations(locale);


  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  if (!session) {
    return <span>Not logged in</span>;
  }

  return (
    <span>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {t.welcome}, {(session.user as any)?.userName || session.user?.name || '...'}
    </span>
  );
} 