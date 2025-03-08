import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/widgets/header/ui';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import { Footer } from '@/widgets/footer/ui';
import Script from 'next/script';

  // Define alternative names with typos and spaces
  const alternativeNames = [
    "BFD Protocol",
    "Beraflow",
    "BeraFlow",
    "BeraflowDAO",
    "Bera flow",
    "bera flow dao",
    "beraflow dao",
    "beraflow",
    // Additional alternative names with typos and spaces
    "Beraflw DAO", "BeraFlow DAO", "Bera Flow DAO", "BearaFlow DAO",
    "BeraflowD AO", "Beraflow D A O", "BeraflowDOA", "Beraflow DOA",
    "BearaflowDAO", "Baraflow DAO", "Beraflwo DAO", "Beraflo DAO",
    "Beraflw", "Bera flo", "Bera-flow", "Bera-Flow-DAO",
    "BFD Protocl", "BFD Protcol", "BFD Protool", "BFDProtocol",
    "BFD-Protocol", "B F D Protocol", "B.F.D Protocol", "B.F.D. Protocol",
    "Beraflow Dao", "BERAFLOW DAO", "beraFlowDAO", "BeraFlow dao",
    "Bera Flow Dao", "BERA FLOW DAO", "Bera-flow-dao", "Bera.Flow.DAO",
    "Beraflowdao", "BeraFlowdao", "Beraflow-DAO", "Beraflow_DAO",
    "Berraflow DAO", "Berraflow", "Berafllow DAO", "Berafllow",
    "Bareflow DAO", "Bareflow", "Berafflow DAO", "Berafflow",
    "Berra Flow", "Berra Flow DAO", "BerraFlow", "BerraFlowDAO",
    "Bera Flo DAO", "Bera Flo", "BeraFlo", "BeraFloDAO",
    "Bera-Flo-DAO", "Bera.Flo.DAO", "B-Flow DAO", "B-Flow",
    "BFlow DAO", "BFlow", "B Flow DAO", "B Flow",
    "Bera Flw DAO", "Bera Flw", "BeraFlw", "BeraFlwDAO",
    "Beraflow D A O", "Beraflow D.A.O", "Beraflow D-A-O", "Beraflow_D_A_O",
    "Beraflow Decentralized Autonomous Organization", "BeraflowDAO Protocol",
    "Bera Flow Protocol", "Bera Flow Decentralized Autonomous Organization",
    "BFD DAO", "BFD", "BFDP", "BFD P", "B.F.D.P.",
    "Beraflow DaO", "BeraFlow dAo", "BeraFlow dAO", "BeraFLOW dao",
    "Beraflow daO", "BeraFlow DA0", "BeraFlow DA0", "BeraFlow D4O",
    "Beraflow D40", "BeraFlow DAO Protocol", "BeraFlow DAO Protocol",
    "Bera Flow DAO Protocol", "Bera-Flow-DAO-Protocol", "Bera.Flow.DAO.Protocol"
  ];

export const metadata: Metadata = {
  title: 'BeraFlow DAO',
  description: 'BeraFlow DAO is a DAO forged through the innovative Proof-of-Liquidity (POL) mechanism of Berachain.',
  openGraph: {
    title: 'BeraFlow DAO',
    description: 'BeraFlow DAO is a DAO forged through the innovative Proof-of-Liquidity (POL) mechanism of Berachain.',
    url: 'https://beraflowdao.com',
    siteName: 'BeraFlow DAO',
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
  },
  metadataBase: new URL('https://beraflowdao.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
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
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BeraFlow DAO",
              "alternateName": alternativeNames,
              "url": "https://beraflowdao.com",
              "logo": "https://beraflowdao.com/images/logo.jpg",
              "description": "BeraFlow DAO is a DAO forged through the innovative Proof-of-Liquidity (POL) mechanism of Berachain."
            })
          }}
        />
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
