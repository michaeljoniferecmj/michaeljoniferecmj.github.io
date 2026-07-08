import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { profile } from '@/data/profile';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.summary,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: `${profile.name} — ${profile.title}`,
    description: profile.summary,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
