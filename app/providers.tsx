'use client'

import {HeroUIProvider, ToastProvider} from '@heroui/react'
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
            accentColor: "#FF9F5B",
            accentColorForeground: "#000000",
        })}><HeroUIProvider>
            <ToastProvider />
            {children}
          </HeroUIProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
