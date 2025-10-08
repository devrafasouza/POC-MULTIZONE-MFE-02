import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AppShell from './components/AppShell';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'MFE',
  description: 'Demo Multi-Zone (App Router)',
};

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/mfe-02';
const OTHER_BASE = process.env.NEXT_PUBLIC_OTHER_BASE_PATH || '/mfe-01';
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MFE';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppShell
          appName={APP_NAME}
          basePath={BASE_PATH}
          otherBasePath={OTHER_BASE}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
