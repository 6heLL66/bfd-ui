import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/widgets/header/ui";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Footer } from "@/widgets/footer/ui";
import { ToastProvider } from "@heroui/react";

export const metadata: Metadata = {
  title: "BeraFlowDao",
  description:
    "BeraFlowDao is a DAO forged through the innovative Proof-of-Liquidity (POL) mechanism of Berachain.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased min-h-screen bg-bg text-foreground-primary relative`}
      >
        <Providers>
          <div className="max-w-[1440px] mx-auto min-h-screen flex flex-col justify-between">
            <Header />
            {children}
            <Footer />
          </div>

          <canvas id="canvas-club" />
        </Providers>
      </body>
    </html>
  );
}
