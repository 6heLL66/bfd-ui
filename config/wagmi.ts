import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, berachainBepolia } from 'viem/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'BeraFlowDao',
  projectId: '1dca7864-5a9d-4795-9630-275810877154',
  chains: process.env.NEXT_PUBLIC_DEV === 'true' ? [berachainBepolia] : [mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
