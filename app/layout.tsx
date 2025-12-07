import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL('https://skale.space'),
  title: {
    default: 'SKALE Network',
    template: '%s | SKALE Network',
  },
  description: 'The Private Blockchain Designed for the Agentic Era',
  keywords: ['SKALE', 'blockchain', 'cryptocurrency', 'Ethereum', 'Layer 2', 'gas-free', 'scalable blockchain', 'Web3'],
  authors: [{ name: 'SKALE Network' }],
  creator: 'SKALE Network',
  publisher: 'SKALE Network',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://skale.space',
    siteName: 'SKALE Network',
    title: 'SKALE Network',
    description: 'The Private Blockchain Designed for the Agentic Era',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'SKALE Network - Designed for the Internet of Agents',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SKALE Network',
    description: 'The Private Blockchain Designed for the Agentic Era',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased', inter.variable)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SKALE Network',
              url: 'https://skale.space',
              logo: 'https://skale.space/logo.svg',
              description: 'The Private Blockchain Designed for the Agentic Era',
              sameAs: [
                'https://x.com/SkaleNetwork',
                'https://github.com/skalenetwork',
                'https://discord.com/invite/skale',
                'https://t.me/skaleofficial',
              ],
            }),
          }}
        />
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Skip to main content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
