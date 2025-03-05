import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/widgets/header/ui';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Footer } from '@/widgets/footer/ui';

export const metadata: Metadata = {
  title: 'Beraflow DAO',
  description: 'Beraflow DAO is a DAO forged through the innovative Proof-of-Liquidity (POL) mechanism of Berachain.',
  openGraph: {
    title: 'Beraflow DAO',
    description: 'Beraflow DAO is a DAO forged through the innovative Proof-of-Liquidity (POL) mechanism of Berachain.',
    url: 'https://beraflowdao.com',
    siteName: 'Beraflow DAO',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Bera flow DAO',
      }
    ]
  }
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased min-h-screen bg-bg text-foreground-primary relative`}>
        <Providers>
          <div className="max-w-[1440px] mx-auto min-h-screen flex flex-col justify-between">
            <Header />
            {children}
            <Footer />
          </div>

          <canvas id="canvas-club" />
        </Providers>
      </body>
    </html>
  );
}
