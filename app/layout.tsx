import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { env } from '@/lib/env';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from 'sonner';
import { generateMetadata as generateSEOMetadata } from '@/app/(seo)/metadata';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: 'Omar Creates',
  }),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Omar Creates',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0B0D10',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Omar Creates',
    url: siteUrl,
    logo: `${siteUrl}/icons/icon-192x192.svg`,
    description: 'Simple iOS & Web micro-SaaS ideas. Validate fast. Demos, data, decisions.',
    socialMedia: [
      'https://x.com/omar_create',
      'https://github.com/eltahawyomar001-eng/Omar-Creates',
    ],
  }

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icons/icon-192x192.svg" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable} tabular-nums antialiased flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            },
          }}
        />
        <PWARegister />
      </body>
    </html>
  );
}

function PWARegister() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator && '${process.env.NODE_ENV}' === 'production') {
            window.addEventListener('load', () => {
              navigator.serviceWorker
                .register('/sw.js')
                .then(registration => {
                  console.log('SW registered:', registration);
                })
                .catch(error => {
                  console.log('SW registration failed:', error);
                });
            });
          }
        `,
      }}
    />
  );
}
