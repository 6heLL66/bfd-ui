import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { berachain, berachainBepolia } from 'viem/chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'BeraFlow DAO',
  projectId: '1dca7864-5a9d-4795-9630-275810877154',
  chains: [berachain, berachainBepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
