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

/**
 * Restores the persisted Dev Mode choice BEFORE first paint.
 *
 * This has to be a blocking inline script, not an effect: the site is a static
 * export, so the HTML ships in default (light) mode and a `useEffect` would
 * repaint the whole interface one frame in — a full-page white flash on every
 * navigation for anyone who left Dev Mode on.
 *
 * Kept deliberately tiny and dependency-free. The storage key is duplicated
 * from DevModeToggle.tsx because this string is inlined into <head> and cannot
 * import; `MODE_STORAGE_KEY` there is the other half of the pair.
 */
const MODE_BOOTSTRAP = `try{if(localStorage.getItem('portfolio-mode')==='dev'){document.documentElement.dataset.mode='dev'}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MODE_BOOTSTRAP }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
