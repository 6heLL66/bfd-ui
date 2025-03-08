import Requests from "@/shared/api/requests";
import { Metadata } from "next";
import { TreasuryPage } from "./treasure";

export const metadata: Metadata = {
  title: 'Treasury | BFD Protocol',
  description: 'View and analyze the distribution of BFD Protocol treasury assets. Track token allocations and monitor treasury health in real-time.',
  openGraph: {
    title: 'Treasury | BFD Protocol',
    description: 'View and analyze the distribution of BFD Protocol treasury assets. Track token allocations and monitor treasury health in real-time.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treasury | BFD Protocol',
    description: 'View and analyze the distribution of BFD Protocol treasury assets. Track token allocations and monitor treasury health in real-time.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

const Page = async () => {
  const data = await Requests.getTreasuryHistory();
  const tokens = await Requests.getTokens();
  
  return <TreasuryPage history={data} tokens={tokens} />;
}

export default Page;