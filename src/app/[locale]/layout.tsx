import "./globals.css";
// import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from "next-auth/react";



export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
} 