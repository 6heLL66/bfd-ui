import { Metadata } from 'next';
import { BfdStackingClient } from './components/BfdStackingClient';

export const metadata: Metadata = {
  title: 'Staking BFD | BFD Protocol',
  description: 'Stake your BFD tokens to get gathering allocation. Each stacker gets a unique allocation based on the amount of BFD they stake.',
  openGraph: {
    title: 'Staking BFD | BFD Protocol',
    description: 'Stake your BFD tokens to get gathering allocation. Each stacker gets a unique allocation based on the amount of BFD they stake.',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staking BFD | BFD Protocol',
    description: 'Stake your BFD tokens to get gathering allocation. Each stacker gets a unique allocation based on the amount of BFD they stake.',
    images: [],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function Page() {
  return <BfdStackingClient />;
}
