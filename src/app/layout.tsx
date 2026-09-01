import type { Metadata, Viewport } from 'next';
import { SmoothScroll } from '@/components/common/SmoothScroll';
import { AmbientBackground } from '@/components/common/AmbientBackground';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'RecoBit — AI-Powered Enterprise Bank Reconciliation Platform',
  description:
    'RecoBit compresses days of manual financial matching into minutes. Automate bank transaction ingestion, get Top 10 high-confidence ledger suggestions, resolve exceptions in bulk, and push directly to Tally Prime and enterprise ERPs.',
  keywords: [
    'Bank Reconciliation Software',
    'AI Bank Reconciliation',
    'Tally Prime Reconciliation',
    'Automated Ledger Mapping',
    'Enterprise Financial Close',
    'RecoBit',
    'ERP Bank Reconciliation',
  ],
  authors: [{ name: 'RecoBit Technologies' }],
  openGraph: {
    title: 'RecoBit — Stop Searching for the Right Ledger',
    description:
      'Eliminate the 80% manual time-sink in bank transaction processing with RecoBit’s hybrid reconciliation engine.',
    type: 'website',
    locale: 'en_US',
    siteName: 'RecoBit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RecoBit — AI-Powered Enterprise Bank Reconciliation',
    description:
      'Compress days of manual financial matching into minutes. Real-time bank stream ingestion and ERP sync.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FF5500',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <SmoothScroll>
          <AmbientBackground />
          <Navbar />
          <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
