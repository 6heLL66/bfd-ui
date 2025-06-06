import { Metadata } from 'next';
import { GatheringClient } from './components/GatheringClient';

export const metadata: Metadata = {
  title: 'BeraFlowDao Gathering | BFD Protocol',
  description: 'Participate in the BeraFlowDao gathering phases with different rates (1:1, 1:1.03, 1:1.06) based on phase. Initial, Whitelist and Public phases available.',
  openGraph: {
    title: 'BeraFlowDao Gathering | BFD Protocol',
    description: 'Participate in the BeraFlowDao gathering phases with different rates (1:1, 1:1.03, 1:1.06) based on phase. Initial, Whitelist and Public phases available.',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BeraFlowDao Gathering | BFD Protocol',
    description: 'Participate in the BeraFlowDao gathering phases with different rates (1:1, 1:1.03, 1:1.06) based on phase. Initial, Whitelist and Public phases available.',
    images: [],
  },
  
  robots: {
    index: true,
    follow: true,
  }
};

export default function Page() {
  return <GatheringClient />;
} 