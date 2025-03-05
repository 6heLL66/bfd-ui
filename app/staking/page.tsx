import { Metadata } from 'next';
import { StakingClient } from './components/StakingClient';

export const metadata: Metadata = {
  title: 'Staking | BFD Protocol',
  description: 'Stake your BGT tokens to earn rewards and participate in governance decisions. Earn passive income through staking rewards.',
  openGraph: {
    title: 'Staking | BFD Protocol',
    description: 'Stake your BGT tokens to earn rewards and participate in governance decisions. Earn passive income through staking rewards.',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staking | BFD Protocol',
    description: 'Stake your BGT tokens to earn rewards and participate in governance decisions. Earn passive income through staking rewards.',
    images: [],
  }
};

export default function Page() {
  return <StakingClient />;
}
