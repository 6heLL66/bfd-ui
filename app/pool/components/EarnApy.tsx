import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useVaultStacking } from '@/features/stacking/useVaultStacking';
import { VAULT_CA } from '@/config/berachain';
import { useAccount } from 'wagmi';
import { Button } from '@heroui/button';
import { StakeModal } from './StakeModal';
import { UnstakeModal } from './UnstakeModal';

export const EarnApy = () => {
  const { isConnected } = useAccount();
  const { vault, staked, rewards } = useVaultStacking(VAULT_CA);
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
  const hasStaked = true;

  return (
    <>
      <motion.div
        className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300"
      >
        <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
          <h2 className="text-lg font-semibold">Earn APR</h2>
          <span className="text-2xl font-bold text-primary-default">{(Number(vault?.dynamicData.apr) * 100).toFixed(2)}%</span>
        </div>
        
        <h3 className="text-sm font-medium text-foreground-primary mb-2">Reward Vault</h3>
        <div className="flex items-center justify-between mb-4">
          <Link 
            href={`https://berascan.com/address/${vault?.metadata.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground-secondary hover:text-primary-default transition-colors"
          >
            {VAULT_CA.slice(0, 6)}...{VAULT_CA.slice(-4)}
          </Link>
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
            className="text-foreground-secondary"
          >
            <path d="M7 7h10v10"></path>
            <path d="M7 17L17 7"></path>
          </svg>
        </div>

        {!isConnected ? (
          <div className="mt-4 mb-2">
            <button disabled className="w-full px-4 py-2 bg-primary-default/50 text-white/70 font-medium rounded-lg cursor-not-allowed">
              Connect wallet to stake
            </button>
          </div>
        ) : (
          <>
            {hasStaked && (
              <div className="bg-surface/50 rounded-lg p-3 border border-border/30 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground-primary text-sm font-medium">Your staked LP</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <div className="text-foreground-secondary text-xs mb-1">Amount</div>
                    <div className="text-foreground-primary font-medium">{staked.toSignificant()}</div>
                  </div>
                  <div>
                    <div className="text-foreground-secondary text-xs mb-1">Value</div>
                    <div className="text-foreground-primary font-medium">$1</div>
                  </div>
                </div>
                
                <div>
                    <div className="text-foreground-secondary text-xs mb-2">Pending rewards</div>
                    <div className="flex items-center p-2 rounded-lg gap-1 border border-border/20 bg-surface/30">
                          <div className="flex-1 mr-3">
                            <div className="flex justify-between items-center">
                              <span className="text-foreground-primary text-sm">BGT</span>
                              <div className="text-right">
                                <div className="text-foreground-primary text-sm font-medium">{rewards.toSignificant()}</div>
                                <div className="text-foreground-secondary text-xs">$1</div>
                              </div>
                            </div>
                          </div>
                          
                          <Button 
                            className={`px-3 py-1 text-sm bg-secondary-default bg-primary-default hover:bg-secondary-hover text-white font-medium rounded-lg transition-colors whitespace-nowrap`}
                          >
                            Claim
                          </Button>
                        </div>
                  </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button 
                className="w-full px-4 py-2 bg-primary-default hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                onClick={() => setIsStakeModalOpen(true)}
              >
                Stake
              </Button>
              
              {hasStaked && (
                <Button 
                  className="w-full px-4 py-2 border border-border/40 hover:border-primary-default/40 bg-transparent text-foreground-primary font-medium rounded-lg transition-colors"
                  onClick={() => setIsUnstakeModalOpen(true)}
                >
                  Unstake
                </Button>
              )}
            </div>
            
            <div className="mt-4 border-t border-border/40 pt-3">
              <Link 
                href="/validator" 
                className="flex items-center justify-between p-3 rounded-lg text-sm font-medium bg-primary-default/10 border border-primary-default/30 hover:bg-primary-default/20 hover:border-primary-default/50 text-foreground-primary transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <span className="mr-2 flex items-center justify-center w-5 h-5 bg-primary-default rounded-full text-white text-xs">+</span>
                  <span>Boost your APR with Validator</span>
                </div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="text-primary-default group-hover:translate-x-1 transition-transform duration-200"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </>
        )}
      </motion.div>
      
      {/* Modals */}
      <StakeModal isOpen={isStakeModalOpen} onClose={() => setIsStakeModalOpen(false)} />
      <UnstakeModal isOpen={isUnstakeModalOpen} onClose={() => setIsUnstakeModalOpen(false)} />
    </>
  );
}; 