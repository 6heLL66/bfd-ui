import { Metadata } from 'next';
import { SaleClient } from './components/SaleClient';

export const metadata: Metadata = {
  title: 'Token Sale | BFD Protocol',
  description: 'Participate in the BFD Protocol token sale. Purchase tokens securely and join our growing ecosystem.',
  openGraph: {
    title: 'Token Sale | BFD Protocol',
    description: 'Participate in the BFD Protocol token sale. Purchase tokens securely and join our growing ecosystem.',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Token Sale | BFD Protocol',
    description: 'Participate in the BFD Protocol token sale. Purchase tokens securely and join our growing ecosystem.',
    images: [],
  }
};

export default function Page() {
  return <SaleClient />;
}
