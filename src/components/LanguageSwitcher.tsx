'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Select } from '@/components/ui/Select';

interface LanguageSwitcherProps {
  locale: string;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Tiếng Việt' }
  ];

  return (
    <div className="w-32">
      <Select
        options={languageOptions}
        value={locale}
        onChange={switchLanguage}
        className="text-sm"
      />
    </div>
  );
} 