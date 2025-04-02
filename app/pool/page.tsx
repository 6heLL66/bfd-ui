import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BFD-HONEY Pool | BFD Protocol',
  description: 'Provide liquidity to the BFD-HONEY pool on Berachain and earn trading fees. Stake your LP tokens to maximize your yield with additional rewards.',
  openGraph: {
    title: 'BFD-HONEY Pool | BFD Protocol',
    description: 'Provide liquidity to BFD-HONEY pool on Berachain and earn trading fees. Stake your LP tokens to maximize your yield with additional rewards.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BFD-HONEY Pool | BFD Protocol',
    description: 'Provide liquidity to BFD-HONEY pool on Berachain and earn trading fees. Stake your LP tokens to maximize your yield with additional rewards.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function PoolPage() {
  return null
  // return <PoolClient />;
}
