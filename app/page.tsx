'use client';

import { DOCS_LINK } from '@/config/links';
import { rain, stop } from '@/shared/utils';
import { Button } from '@heroui/button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    rain();
    return () => {
      stop();
    };
  }, []);

  return (
    <main className="py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <section className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 relative min-h-[400px] md:min-h-[600px] w-full flex items-center justify-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary-default/30 rounded-full animate-glow" />

            {/* Main animated composition */}
            <div className="relative scale-75 md:scale-100">
              {/* Rotating rings */}
              <div className="absolute -inset-32 border-[2px] md:border-[3px] border-primary/20 rounded-full animate-pulse-ring" style={{ animationDuration: '8s', animationDelay: '-1s' }} />
              <div
                className="absolute -inset-24 border-[2px] md:border-[3px] border-primary/30 rounded-full animate-pulse-ring"
                style={{
                  animationDuration: '6s',
                  animationDirection: 'reverse',
                }}
              />
              <div className="absolute -inset-16 border-[2px] md:border-[3px] border-primary/40 rounded-full animate-pulse-ring" style={{ animationDuration: '4s', animationDelay: '-0.5s' }} />

              {/* Central orb */}
              <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] animate-pulse-orb" style={{ animationDuration: '3s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-default via-primary to-purple-600 rounded-full blur-sm" />
                <div className="absolute inset-[2px] bg-black/90 rounded-full backdrop-blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-primary/30 rounded-full" />

                {/* Wave Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-32 h-32 md:w-48 md:h-48">
                    <svg viewBox="0 0 24 24" className="w-full h-full filter drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] md:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                      <path
                        d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
                        className="stroke-white/90"
                        fill="none"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      >
                        <animate
                          attributeName="d"
                          dur="3s"
                          repeatCount="indefinite"
                          values="
                            M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1;
                            M2 7c.6.5 1.2 1 2.5 1C7 8 7 6 9.5 6c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1;
                            M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1
                          "
                        />
                      </path>
                      <path
                        d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
                        className="stroke-white"
                        fill="none"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      >
                        <animate
                          attributeName="d"
                          dur="3s"
                          repeatCount="indefinite"
                          values="
                            M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1;
                            M2 13c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1;
                            M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1
                          "
                        />
                      </path>
                      <path
                        d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
                        className="stroke-white/80"
                        fill="none"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      >
                        <animate
                          attributeName="d"
                          dur="3s"
                          repeatCount="indefinite"
                          values="
                            M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1;
                            M2 19c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1;
                            M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1
                          "
                        />
                      </path>
                    </svg>
                    {/* Enhanced Glow effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-full filter blur-xl md:blur-2xl animate-pulse" />
                    <div className="absolute -inset-4 bg-white/5 rounded-full filter blur-lg md:blur-xl animate-pulse" style={{ animationDelay: '-1s' }} />
                  </div>
                </div>

                {/* Floating particles */}
                <div className="absolute -inset-8 md:-inset-16">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 md:w-3 md:h-3 bg-primary/80 rounded-full blur-sm animate-pulse-orb"
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

          <div className="flex-1 flex flex-col gap-8 max-w-[628px] mx-auto px-4 lg:px-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans text-center lg:text-left bg-gradient-to-r from-white via-orange-400 to-orange-500 bg-clip-text text-transparent font-bold">
              Beraflow DAO
            </h1>

            <div className="space-y-4 md:space-y-6">
              <p className="text-sm md:text-base text-white/80 leading-relaxed text-center lg:text-left">
                Beraflow DAO is a DAO forged through the innovative Proof-of-Liquidity (POL) mechanism of Berachain.
              </p>

              <p className="text-sm md:text-base text-white/80 leading-relaxed text-center lg:text-left">
                Beraflow DAO is built on the foundation of Berachain because we recognize the immense potential DeFi and the future of cryptocurrency within it. We believe that
                projects with a robust foundation based on a strong treasury value are the key to the future of crypto. We also see the importance of markets becoming more
                efficient and reaching their fair P/E ratios.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start w-full">
              <Link href={'/swap'} className="w-full sm:w-auto">
                <Button className="bg-gradient-to-r from-primary-default to-primary-hover hover:opacity-90 transition-opacity w-full sm:min-w-[200px]" size="lg">
                  <span className="text-white font-bold text-base md:text-lg">Explore</span>
                </Button>
              </Link>

              <Link href={DOCS_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="bg-white/5 hover:bg-white/10 transition-colors border text-white font-bold border-white/10 w-full sm:min-w-[200px]" size="lg">
                  <span className="text-base md:text-lg">Read Docs</span>
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
                    className="opacity-60 relative right-1.5 bottom-1 w-4 h-4 md:w-5 md:h-5"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
