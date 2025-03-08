import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Swap | BFD Protocol',
  description: 'Swap tokens instantly with the best rates and lowest fees on Berachain. Trade your tokens seamlessly with our optimized DEX aggregator.',
  openGraph: {
    title: 'Swap | BFD Protocol',
    description: 'Swap tokens instantly with the best rates and lowest fees on Berachain. Trade your tokens seamlessly with our optimized DEX aggregator.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swap | BFD Protocol',
    description: 'Swap tokens instantly with the best rates and lowest fees on Berachain. Trade your tokens seamlessly with our optimized DEX aggregator.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function SwapPage() {

  redirect('/');
  // return <SwapClient />;
}
