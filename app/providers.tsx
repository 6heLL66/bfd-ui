'use client'

import {HeroUIProvider} from '@heroui/react'
import { queryClient } from "@/config/queryClient";
import { wagmiConfig } from "@/config/wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale='en-US' theme={darkTheme({
            accentColor: "#6D77FF",
        })}><HeroUIProvider>{children}</HeroUIProvider></RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
