import { Metadata } from 'next';
import { ValidatorClient } from './components/ValidatorClient';

export const metadata: Metadata = {
  title: 'Berachain Guardians Validator | BFD Protocol',
  description: 'Boost the Berachain Guardians validator to increase your staking rewards. Earn higher APR, BGT capture, and special boosts.',
  openGraph: {
    title: 'Berachain Guardians Validator | BFD Protocol',
    description: 'Boost the Berachain Guardians validator to increase your staking rewards. Earn higher APR, BGT capture, and special boosts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Berachain Guardians Validator | BFD Protocol',
    description: 'Boost the Berachain Guardians validator to increase your staking rewards. Earn higher APR, BGT capture, and special boosts.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ValidatorPage() {
  return <ValidatorClient />;
} 