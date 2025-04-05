'use client';

import { WalletGuard } from '@/shared/components/WalletGuard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { GatheringPhaseCard } from './GatheringPhaseCard';
import { GatheringAnimation } from './GatheringAnimation';
import { Alert } from '@heroui/alert';

export function GatheringClient() {
  const [activePhase, setActivePhase] = useState<'initial' | 'whitelist' | 'public'>('initial');

  // Simulated data for the three gathering phases
  const gatheringPhases = [
    {
      id: 'initial',
      title: 'Initial Gathering',
      description: 'Team members, validators, and advisors',
      rate: '1:1',
      price: '1 USDC per 1 $BFD',
      eligibility: 'Team',
      active: false,
      comingSoon: false,
      color: 'primary'
    },
    {
      id: 'whitelist',
      title: 'WL Gathering',
      description: '$BGT pledgers or private deals',
      rate: '1:1.03',
      price: '1.03 USDC per 1 $BFD',
      eligibility: 'Whitelist',
      active: false,
      comingSoon: true,
      color: 'violet'
    },
    {
      id: 'public',
      title: 'Public Gathering',
      description: 'Everyone',
      rate: '1:1.06',
      price: '1.06 USDC per 1 $BFD',
      eligibility: 'Public',
      active: false,
      comingSoon: true,
      color: 'emerald'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="w-full mx-auto flex flex-col gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-8"
    >
      <section className="max-w-7xl mx-auto mb-6 sm:mb-8 md:mb-12">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-1 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-orange-400 to-orange-500 bg-clip-text text-transparent">
                BeraFlowDao Gatherings
              </h1>
              
              <p className="text-base sm:text-lg md:text-[20px] text-white/80 leading-relaxed">
                BeraFlowDao gathers funds in the treasury and emits $BFD with different rates based on the gathering phase for every 1 USDC received.
              </p>

              <Alert
                color="default"
                className="dark backdrop-blur-sm bg-surface border-2 border-primary-default/30 shadow-xl text-sm sm:text-base"
                title={<span className="text-body font-bold text-foreground-primary">Important Information</span>}
                description={
                  <span className="text-xs sm:text-sm text-foreground-secondary">
                    <ul className="list-disc pl-4 sm:pl-5 space-y-1 mt-2">
                      <li>Only <strong>first sale</strong> is conducted on Ethereum mainnet, other sales will be conducted on Berachain</li>
                      <li>Only USDC is accepted via smart contract</li>
                      <li>Funds will be bridged to Berachain after the gathering ends</li>
                      <li>Join our sale on the <a href="/sale" className="text-primary-default hover:underline">Sale Page</a></li>
                      <li className="text-foreground-tertiary mt-1">Infomation about when sale available will be announced in our social media</li>
                      <li className="text-foreground-tertiary mt-1">On first sale, sale contract will not be able to send $BFD emmidiately, it will be sent with script after 1-2 hours</li>
                    </ul>
                  </span>
                }
              />
            </motion.div>
          </div>
          
          <div className="flex-1 order-1 lg:order-2 min-h-[250px] sm:min-h-[300px] md:min-h-[400px] relative w-full">
            <GatheringAnimation activePhase={activePhase} />
          </div>
        </div>
      </section>

      <WalletGuard>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
          className="max-w-7xl mx-auto w-full"
        >
          <div className="bg-surface/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-4 sm:p-6 md:p-8 transition-all duration-300">
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="border-b-2 border-border/40 pb-4 sm:pb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-primary-default">Gathering Phases</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {gatheringPhases.map((phase) => (
                  <GatheringPhaseCard 
                    key={phase.id}
                    phase={phase}
                    isActive={activePhase === phase.id}
                    onClick={() => setActivePhase(phase.id as 'initial' | 'whitelist' | 'public')}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </WalletGuard>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.6 }}
        className="max-w-7xl mx-auto mt-6 sm:mt-8 md:mt-12"
      >
        <div className="bg-surface/30 backdrop-blur-md rounded-xl sm:rounded-2xl border-2 border-border/40 p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Gathering Process Flow
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="bg-surface/50 backdrop-blur-sm rounded-xl border border-border/40 p-4 hover:border-primary-default/40 transition-all duration-300 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-default/20 flex items-center justify-center text-primary-default font-bold text-sm">1</div>
                <h3 className="text-sm sm:text-base font-bold text-foreground-primary">Gather USDC</h3>
              </div>
              <p className="text-xs sm:text-sm text-foreground-secondary">
                Send USDC to the gathering contract on Ethereum mainnet.
              </p>
            </div>
            
            <div className="bg-surface/50 backdrop-blur-sm rounded-xl border border-border/40 p-4 hover:border-primary-default/40 transition-all duration-300 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-default/20 flex items-center justify-center text-primary-default font-bold text-sm">2</div>
                <h3 className="text-sm sm:text-base font-bold text-foreground-primary">Bridge to Berachain</h3>
              </div>
              <p className="text-xs sm:text-sm text-foreground-secondary">
                All collected funds will be bridged to support the BeraFlowDao ecosystem.
              </p>
            </div>
            
            <div className="bg-surface/50 backdrop-blur-sm rounded-xl border border-border/40 p-4 hover:border-primary-default/40 transition-all duration-300 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-default/20 flex items-center justify-center text-primary-default font-bold text-sm">3</div>
                <h3 className="text-sm sm:text-base font-bold text-foreground-primary">$BFD distribution</h3>
              </div>
              <p className="text-xs sm:text-sm text-foreground-secondary">
                Smart contract mints $BFD tokens and sends them to your wallet address.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 