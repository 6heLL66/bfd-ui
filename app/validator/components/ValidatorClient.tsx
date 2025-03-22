'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LightningBoltIcon } from '@radix-ui/react-icons';

const AnimatedBorder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="snake-border-container">
      <div className="snake-border-inner">
        {children}
      </div>
      
      <style jsx>{`
        .snake-border-container {
          position: relative;
          border-radius: 1rem;
          padding: 0;
          overflow: hidden;
        }
        
        .snake-border-inner {
          position: relative;
          z-index: 2;
          height: 100%;
          background: var(--surface);
          border-radius: 1rem;
          margin: 2px;
          overflow: hidden;
        }
        
        .snake-border-container::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            90deg,
            transparent,
            transparent,
            transparent,
            var(--primary-default)
          );
          z-index: 1;
          animation: snake-rotate 4s linear infinite;
        }
        
        @keyframes snake-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export const ValidatorClient = () => {
  // Mock data - replace with real data when available
  const validatorData = {
    name: 'Berachain Guardians',
    operator: '0xb7...C126',
    description: 'BFD Protocol validator for Berachain network',
    bgtEmitted: '544.86K',
    beraStaked: '10.00M',
    boosted: '580.25K',
    website: 'https://bfd.com',
    validatorRanking: 1,
    totalValidators: 63,
    blockProposingRate: '5.37%',
    blockProposingDay: '2.37K / 44.17K',
    boostAPY: '0.16%',
    estimatedReturn: '<0.01',
  };

  // Calculate percentage for visualizations
  const proposingRatePercentage = parseFloat(validatorData.blockProposingRate) * 10; // Scale for visibility

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Main Validator Info */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Validator Card - Redesigned */}
          <div 
            className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 hover:border-primary-default/40 transition-all duration-300"
          >
            {/* Header with validator info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16">
                  <Image
                    src="/images/logo_bear.png"
                    alt={validatorData.name}
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-border/40"
                  />
                  <div className="absolute -right-1 -bottom-1 h-4 w-4 bg-green-500 rounded-full border-2 border-surface"></div>
                </div>
                <div>
                  <h1 className="text-xl md:text-h3 font-bold">{validatorData.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-primary-default/10 text-primary-default text-xs rounded-full">
                      Validator #{validatorData.validatorRanking}
                    </span>
                    <span className="px-2 py-0.5 bg-surface text-foreground-secondary text-xs rounded-full border border-border/40">
                      Operator: <span className="font-mono">{validatorData.operator}</span>
                    </span>
                    <Link 
                      href={validatorData.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 bg-surface text-foreground-secondary text-xs rounded-full border border-border/40 hover:border-primary-default/40 transition-colors"
                    >
                      {validatorData.website}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-foreground-secondary text-sm mb-6">
              {validatorData.description}
            </p>
            
            {/* Validator Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface/50 rounded-lg p-4 border border-border/30 hover:border-primary-default/30 transition-all">
                <div className="text-foreground-secondary text-sm mb-1">BGT emitted</div>
                <div className="text-foreground-primary text-xl font-semibold">{validatorData.bgtEmitted}</div>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-border/30 hover:border-primary-default/30 transition-all">
                <div className="text-foreground-secondary text-sm mb-1">BERA staked</div>
                <div className="text-foreground-primary text-xl font-semibold">{validatorData.beraStaked}</div>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-border/30 hover:border-primary-default/30 transition-all">
                <div className="text-foreground-secondary text-sm mb-1">Boosted</div>
                <div className="text-foreground-primary text-xl font-semibold">{validatorData.boosted}</div>
              </div>
            </div>
          </div>
          
          {/* Performance Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Estimated Return Card */}
            <div
              className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-5 hover:border-primary-default/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-emerald-500/10 rounded-full p-2 mr-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8c-2.168 0-4 1.832-4 4s1.832 4 4 4 4-1.832 4-4-1.832-4-4-4z" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-foreground-primary">Estimated Return</h3>
              </div>
              
              <div className="flex items-center mb-3">
                <div>
                  <div className="text-3xl font-bold">{validatorData.estimatedReturn}</div>
                  <div className="text-xs text-foreground-secondary">BGT per boost</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-foreground-secondary">Time to rewards</span>
                  <span className="text-xs font-medium text-emerald-500">~24 hours</span>
                </div>
              </div>
            </div>
            
            {/* Block Proposing Rate */}
            <div
              className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-5 hover:border-primary-default/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/10 rounded-full p-2 mr-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8v8m0-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 6v12m0-12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 24a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-foreground-primary">Block Proposing</h3>
              </div>
              
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-3xl font-bold">{validatorData.blockProposingRate}</span>
              </div>
              
              <div className="relative h-2 bg-surface/50 rounded-full overflow-hidden mb-2">
                <div className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${proposingRatePercentage}%` }}></div>
              </div>
              
              <div className="text-xs text-foreground-secondary">
                Last day: <span className="text-blue-400 font-medium">{validatorData.blockProposingDay}</span>
              </div>
            </div>
            
            {/* Boost APY */}
            <div
              className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl hover:border-primary-default/40 shadow-primary-default/10 p-5 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-yellow-500/10 rounded-full p-2 mr-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-foreground-primary">Boost APY</h3>
                <div className="ml-2 relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-default rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-default rounded-full"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold text-primary-default">{validatorData.boostAPY}</span>
              </div>
            </div>
          </div>
          
          {/* Reward Vault Card - New Addition */}
          <div
            className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-5 hover:border-primary-default/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-primary-default/10 rounded-full p-2 mr-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11V8C20 7.46957 19.7893 6.96086 19.4142 6.58579C19.0391 6.21071 18.5304 6 18 6H6C5.46957 6 4.96086 6.21071 4.58579 6.58579C4.21071 6.96086 4 7.46957 4 8V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V15" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 10V14M15 11V13M9 12V14" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-foreground-primary">Reward Vault</h3>
                <div className="ml-2 relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-default rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-default rounded-full"></div>
                </div>
              </div>
              <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-xs font-medium">
                +1.2% APY
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 px-4 bg-surface/50 rounded-lg border border-border/20 mb-3">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary-default/20 flex items-center justify-center mr-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-foreground-primary text-sm font-medium">0.0124 BGT</div>
                  <div className="text-foreground-secondary text-xs">
                    Available to claim
                  </div>
                </div>
              </div>
              <button
                className="px-4 py-1.5 bg-gradient-to-r from-primary-default to-primary-hover text-black font-medium rounded-lg text-xs transition-all duration-200 shadow-sm hover:shadow"
              >
                Claim
              </button>
            </div>
            
            <Link 
              href="/pool" 
              className="flex items-center justify-between py-2 px-3 bg-surface/30 rounded-lg border border-border/20 hover:border-primary-default/30 transition-colors text-sm text-foreground-secondary hover:text-foreground-primary"
            >
              <div className="flex items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M9 11l3 3l8-8" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Earn bgt</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Right Column - Boost Actions */}
        <div className="col-span-12 lg:col-span-4 min-h-full">
          <AnimatedBorder>
            <div
              className="bg-surface backdrop-blur-xl rounded-2xl min-h-full border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 hover:border-primary-default/40 transition-all duration-300 sticky top-6"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-3 mb-4">
                <h3 className="text-lg font-semibold text-foreground-primary">Your Boosts</h3>
                <button 
                  className="mt-4 md:mt-0 px-6 py-1.5 bg-gradient-to-r from-primary-default to-primary-hover text-black font-bold rounded-lg shadow-lg shadow-primary-default/20 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-default/30 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2">
                    <LightningBoltIcon className="w-4.5 h-4.5" />
                    <span>Boost</span>
                  </div>
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col items-center justify-center py-6">
                  <motion.div 
                    className="relative mb-6"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    animate={{ 
                      boxShadow: ["0 0 0 rgba(var(--primary-default-rgb), 0.4)", "0 0 20px rgba(var(--primary-default-rgb), 0.2)", "0 0 0 rgba(var(--primary-default-rgb), 0.4)"]
                    }}
                    transition={{ 
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }
                    }}
                  >
                    <div className="absolute inset-0 bg-primary-default/20 rounded-full blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-primary-default/20 to-primary-default/5 h-24 w-24 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary-default/30">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 h-6 w-6 bg-primary-default rounded-full flex items-center justify-center text-black font-bold text-xs animate-bounce">+</div>
                  </motion.div>
                  
                  <p className="text-sm text-foreground-secondary mb-8 text-center max-w-xs">
                    You have no active boosts with this validator. Connect your wallet to start boosting and earning rewards.
                  </p>
                  
                  <button 
                    className="w-full bg-gradient-to-r from-primary-default to-primary-hover hover:from-primary-hover hover:to-primary-default text-black font-medium py-3.5 px-6 rounded-lg text-sm transition-all duration-300 shadow-lg shadow-primary-default/20 hover:shadow-xl hover-shadow-primary-default/30 flex items-center justify-center"
                  >
                    <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="7" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M16 11V6a4 4 0 0 0-4-4v0a4 4 0 0 0-4 4v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Connect Wallet
                  </button>
                </div>
                
                <div className="mt-4 pt-6 border-t border-border/20">
                  <div className="flex flex-col space-y-4">
                    <div className="rounded-xl bg-foreground-primary/5 p-4">
                      <h4 className="text-sm font-medium mb-2 text-foreground-primary">What are validator boosts?</h4>
                      <p className="text-xs text-foreground-secondary">
                        Boosting validators allows you to support network security while earning additional rewards from transaction fees and emissions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedBorder>
        </div>
      </div>
    </div>
  );
};