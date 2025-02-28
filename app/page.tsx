"use client";

import { rain, stop } from "@/shared/utils";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    rain();
    return () => {
      stop();
    }
  }, []);
  
  return (
    <main className="bg-gradient-to-b from-black via-black/95 to-primary/5 py-16">
      <div className="container mx-auto">
        <section className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 relative">
            <div className="absolute -z-10 w-full h-full blur-[120px] bg-primary/20 rounded-full" />
            <Image 
              src="/images/bear.png" 
              alt="bear" 
              width={600} 
              height={800}
              className="w-full max-w-[500px] mx-auto hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="flex-1 flex flex-col gap-8 max-w-[628px] mx-auto">
            <h1 className="text-5xl md:text-2xl; font-sans text-center font-bold lg:text-left bg-gradient-to-r from-white via-primary to-primary-default bg-clip-text text-transparent">
              BeraFlowDao
            </h1>

            <div className="space-y-6">
              <p className="text-text text-white/80 leading-relaxed">
                BeraFlowDao is a DAO forged through the innovative Proof-of-Liquidity
                (POL) mechanism of Berachain.
              </p>

              <p className="text-text text-white/80 leading-relaxed">
                BeraFlowDao is built on the foundation of Berachain because we
                recognize the immense potential DeFi and the future of cryptocurrency
                within it. We believe that projects with a robust foundation based on
                a strong treasury value are the key to the future of crypto. We also
                see the importance of markets becoming more efficient and reaching
                their fair P/E ratios.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button 
                className="bg-gradient-to-r from-primary-default to-primary-hover hover:opacity-90 transition-opacity" 
                size="lg"
              >
                <span className="text-white font-bold">Explore</span>
              </Button>
              
              <Button 
                className="bg-white/5 hover:bg-white/10 transition-colors border border-white/10" 
                size="lg"
              >
                <span className="text-white font-bold">Read Docs</span>
              </Button>
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
