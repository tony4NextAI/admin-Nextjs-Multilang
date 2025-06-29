'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Select } from '@/components/ui/Select';
import { FaGlobe } from 'react-icons/fa';

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
    <div className="flex items-center space-x-2">
      <FaGlobe className="h-4 w-4 text-gray-500" />
      <div className="w-32">
        <Select
          options={languageOptions}
          value={locale}
          onChange={switchLanguage}
          className="text-sm"
        />
      </div>
    </div>
  );
} 