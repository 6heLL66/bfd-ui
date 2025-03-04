"use client";

import { DOCS_LINK } from "@/config/links";
import { rain, stop } from "@/shared/utils";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    rain();
    return () => {
      stop();
    };
  }, []);

  return (
    <main className="py-16">
      <div className="container mx-auto">
        <section className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 relative min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary-default/30 rounded-full animate-glow" />

            {/* Main animated composition */}
            <div className="relative">
              {/* Rotating rings */}
              <div
                className="absolute -inset-32 border-[3px] border-primary/20 rounded-full animate-pulse-ring"
                style={{ animationDuration: "8s", animationDelay: "-1s" }}
              />
              <div
                className="absolute -inset-24 border-[3px] border-primary/30 rounded-full animate-pulse-ring"
                style={{
                  animationDuration: "6s",
                  animationDirection: "reverse",
                }}
              />
              <div
                className="absolute -inset-16 border-[3px] border-primary/40 rounded-full animate-pulse-ring"
                style={{ animationDuration: "4s", animationDelay: "-0.5s" }}
              />

              {/* Central orb */}
              <div
                className="relative w-[300px] h-[300px] animate-pulse-orb"
                style={{ animationDuration: "3s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-default via-primary to-purple-600 rounded-full blur-sm" />
                <div className="absolute inset-[2px] bg-black/90 rounded-full backdrop-blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-primary/30 rounded-full" />

                {/* Wave Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="relative w-48 h-48 animate-pulse-orb"
                    style={{ animationDuration: "2s" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-white/10 filter blur-lg" />
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full filter drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                    >
                      <path
                        d="M15,50 Q35,30 50,50 T85,50"
                        className="stroke-white"
                        fill="none"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M15,70 Q35,50 50,70 T85,70"
                        className="stroke-white/80"
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M15,30 Q35,10 50,30 T85,30"
                        className="stroke-white/80"
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Enhanced Glow effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-full filter blur-2xl animate-pulse" />
                    <div
                      className="absolute -inset-4 bg-white/5 rounded-full filter blur-xl animate-pulse"
                      style={{ animationDelay: "-1s" }}
                    />
                  </div>
                </div>

                {/* Floating particles */}
                <div className="absolute -inset-16">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-primary/80 rounded-full blur-sm animate-pulse-orb"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${3 + i}s infinite ease-in-out`,
                        animationDelay: `${-i * 0.3}s`,
                        scale: `${0.5 + Math.random() * 0.5}`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-8 max-w-[628px] mx-auto">
            <h1 className="text-5xl md:text-2xl; font-sans text-center font-bold lg:text-left bg-gradient-to-r from-white via-orange-400 to-orange-500 bg-clip-text text-transparent">
              BeraFlowDao
            </h1>

            <div className="space-y-6">
              <p className="text-text text-white/80 leading-relaxed">
                BeraFlowDao is a DAO forged through the innovative
                Proof-of-Liquidity (POL) mechanism of Berachain.
              </p>

              <p className="text-text text-white/80 leading-relaxed">
                BeraFlowDao is built on the foundation of Berachain because we
                recognize the immense potential DeFi and the future of
                cryptocurrency within it. We believe that projects with a robust
                foundation based on a strong treasury value are the key to the
                future of crypto. We also see the importance of markets becoming
                more efficient and reaching their fair P/E ratios.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href={"/swap"}>
                <Button
                  className="bg-gradient-to-r from-primary-default to-primary-hover hover:opacity-90 transition-opacity min-w-[200px]"
                  size="lg"
                >
                  <span className="text-white font-bold">Explore</span>
                </Button>
              </Link>

              <Link href={DOCS_LINK} target="_blank" rel="noopener noreferrer">
                <Button
                  className="bg-white/5 hover:bg-white/10 transition-colors border text-white font-bold border-white/10"
                  size="lg"
                >
                  Read Docs
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60 relative right-1.5 bottom-1"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </Button>
              </Link>
            </div>

            {/* <div className="flex items-center gap-6 mt-8">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">$1.2M+</span>
                <span className="text-sm text-white/60">Total Value Locked</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">12K+</span>
                <span className="text-sm text-white/60">Active Users</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">95K+</span>
                <span className="text-sm text-white/60">Transactions</span>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    </main>
  );
}
