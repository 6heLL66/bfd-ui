"use client";

import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from 'react-toastify';
import { queryClient } from "@/config/queryClient";
import { wagmiConfig } from "@/config/wagmi";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          locale="en-US"
          theme={darkTheme({
            accentColor: "#FF9F5B",
            accentColorForeground: "#ffffff",
          })}
        >
          <HeroUIProvider>
            <ToastContainer theme="dark" position="bottom-right" className="border-border" />
            {children}
          </HeroUIProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
