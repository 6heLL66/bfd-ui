"use client";

import { rain } from "@/shared/utils";
import { Button } from "@heroui/button";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    rain();
  }, []);
  
  return (
    <div className="flex gap-16 mt-24">
      <Image src="/images/bear.png" alt="bear" width={600} height={800} />
      <div className="flex flex-col gap-4 max-w-[628px] mx-auto pt-8">
        <span className="text-h1 font-display text-center">BeraFlowDao</span>

        <span className="text-body mt-8">
          BeraFlowDao is a DAO forged through the innovative Proof-of-Liquidity
          (POL) mechanism of Berachain.
        </span>

        <span className="text-body mt-8">
          BeraFlowDao is built on the foundation of Berachain because we
          recognize the immense potential DeFi and the future of cryptocurrency
          within it. We believe that projects with a robust foundation based on
          a strong treasury value are the key to the future of crypto. We also
          see the importance of markets becoming more efficient and reaching
          their fair P/E ratios.
        </span>

        <Button className="mt-8 bg-primary-default opacity-40 pointer-events-none" size="lg" disabled>
          <span className="text-body font-bold text-foreground-primary">Explore</span>
        </Button>
      </div>
    </div>
  );
}
