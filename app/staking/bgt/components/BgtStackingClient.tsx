'use client';

import { motion } from 'framer-motion';
import { WalletGuard } from '@/shared/components/WalletGuard';
import { Card } from '@heroui/react';
import { Spinner } from '@heroui/spinner';
import { useVaultStacking } from '@/features/stacking/useVaultStacking';
import { bgtToken, VAULT_CA } from '@/config/berachain';
import Image from 'next/image';
import Link from 'next/link';
import { erc20Abi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import { TokenAmount } from '@berachain-foundation/berancer-sdk';
import { BigintIsh } from '@berachain-foundation/berancer-sdk';
import { useState } from 'react';

export const BgtStackingClient = () => {
  const { address } = useAccount();
  const { vault, isLoading, staked, rewards, claim } = useVaultStacking(VAULT_CA);
  const [activeTab, setActiveTab] = useState<'stake' | 'boost'>('stake');
  const [stakeAmount, setStakeAmount] = useState('');
  const [boostAmount, setBoostAmount] = useState('');
  const [isStaking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const [stakeTabMode, setStakeTabMode] = useState<'stake' | 'unstake'>('stake');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isUnstaking] = useState(false);

  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: bgtToken.address,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  const bgtBalance = TokenAmount.fromRawAmount(bgtToken, balance ?? 0 as BigintIsh);

  const handleClaim = async () => {
    if (isLoading || isClaiming) return;
    setIsClaiming(true);
    try {
      await claim();
    } catch (error) {
      console.error('Failed to claim rewards:', error);
    } finally {
      setIsClaiming(false);
    }
  };

  const handleBoost = async () => {
    if (isLoading || isBoosting || !boostAmount) return;
    setIsBoosting(true);
    try {
      // Implement boost functionality
      console.log(`Boosting with ${boostAmount} BGT`);
      // Mock implementation, replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to boost validator:', error);
    } finally {
      setIsBoosting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl font-bold text-foreground-primary">BGT Rewards Vault</h1>
          <p className="text-foreground-secondary">Stake LP tokens and boost validators to earn BGT rewards</p>
        </div>
        
        <Link
          href={vault?.metadata.url || 'https://hub.berachain.com'}
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border/40 hover:border-primary-default/50 transition-all duration-300 group"
        >
          {isLoading || !vault ? (
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 bg-border/20 rounded-full animate-pulse"></span>
              <span className="h-4 w-20 bg-border/20 rounded animate-pulse"></span>
            </div>
          ) : (
            <>
              <Image src={vault?.metadata.logoURI || '/images/logo.png'} alt="Logo" width={20} height={20} className="rounded-full" />
              <span className="text-sm font-medium">Visit BeraHub Vault</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground-secondary opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </>
          )}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-surface backdrop-blur-xl border-2 border-border/40 p-6 h-full">
              <div className="flex flex-col h-full">
                <span className="text-sm text-foreground-secondary mb-2">Total Staked</span>
                {isLoading ? (
                  <div className="h-8 w-32 bg-border/20 rounded animate-pulse"></div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-foreground-primary">{staked.toSignificant()}</span>
                    <span className="text-sm text-foreground-secondary mb-1">LP Tokens</span>
                  </div>
                )}
                
                <div className="mt-auto pt-4">
                  <div className="flex items-center gap-1 text-sm text-foreground-secondary">
                    <span>APR:</span>
                    {isLoading || !vault ? (
                      <div className="h-4 w-16 bg-border/20 rounded animate-pulse"></div>
                    ) : (
                      <span className="font-medium text-primary-default">{(+vault.dynamicData.apr * 100).toFixed(2)}%</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="bg-surface backdrop-blur-xl border-2 border-border/40 p-6 h-full">
              <div className="flex flex-col h-full">
                <span className="text-sm text-foreground-secondary mb-2">Pending Rewards</span>
                {isLoading ? (
                  <div className="h-8 w-32 bg-border/20 rounded animate-pulse"></div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-foreground-primary">{rewards.toSignificant()}</span>
                    <span className="text-sm text-foreground-secondary mb-1">BGT</span>
                  </div>
                )}
                
                <div className="mt-auto pt-4">
                  <button
                    onClick={handleClaim}
                    disabled={isLoading || isClaiming || Number(rewards.toSignificant()) === 0}
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium ${
                      Number(rewards.toSignificant()) === 0
                        ? 'bg-border/20 text-foreground-secondary/50 cursor-not-allowed'
                        : 'bg-primary-default text-black hover:opacity-90 transition-opacity'
                    }`}
                  >
                    {isClaiming ? (
                      <div className="flex items-center justify-center gap-2">
                        <Spinner size="sm" color="default" />
                        <span>Claiming...</span>
                      </div>
                    ) : (
                      'Claim Rewards'
                    )}
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Card */}
          <WalletGuard>
            <motion.div
              className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-xl shadow-primary-default/5 p-6 w-full hover:border-border/60 transition-all duration-300"
            >
              {/* Tabs */}
              <div className="border-b border-border/40 mb-6">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setActiveTab('stake')}
                    className={`py-2 font-medium transition-colors ${
                      activeTab === 'stake' ? 'text-primary-default border-b-2 border-primary-default' : 'text-foreground-secondary hover:text-foreground-primary'
                    }`}
                  >
                    Stake LP Tokens
                  </button>
                  <button
                    onClick={() => setActiveTab('boost')}
                    className={`py-2 font-medium transition-colors ${
                      activeTab === 'boost' ? 'text-primary-default border-b-2 border-primary-default' : 'text-foreground-secondary hover:text-foreground-primary'
                    }`}
                  >
                    Boost Validator
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'stake' ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground-primary">Stake/Unstake LP Tokens</span>
                      <Link
                        href={vault?.metadata.url || 'https://hub.berachain.com'}
                        target="_blank"
                        className="text-sm text-primary-default hover:underline flex items-center gap-1"
                      >
                        Go to BeraHub
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 7h10v10"></path>
                          <path d="M7 17L17 7"></path>
                        </svg>
                      </Link>
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 bg-primary-default/10 rounded-lg">
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
                        className="text-primary-default"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      <span className="text-sm text-primary-default">
                        You are currently staking <span className="font-bold">{staked.toSignificant()}</span> LP tokens
                      </span>
                    </div>
                    
                    {/* Stake/Unstake Tab Navigation */}
                    <div className="flex border-b border-border/30">
                      <button
                        className={`flex-1 py-2 text-sm font-medium ${
                          stakeTabMode === 'stake' 
                            ? 'text-primary-default border-b-2 border-primary-default' 
                            : 'text-foreground-secondary hover:text-foreground-primary'
                        }`}
                        onClick={() => setStakeTabMode('stake')}
                      >
                        Stake
                      </button>
                      <button
                        className={`flex-1 py-2 text-sm font-medium ${
                          stakeTabMode === 'unstake' 
                            ? 'text-primary-default border-b-2 border-primary-default' 
                            : 'text-foreground-secondary hover:text-foreground-primary'
                        }`}
                        onClick={() => setStakeTabMode('unstake')}
                      >
                        Unstake
                      </button>
                    </div>
                    
                    {/* Stake/Unstake Content */}
                    <div className="bg-surface/30 border border-border/40 rounded-xl p-4">
                      {stakeTabMode === 'stake' ? (
                        <>
                          {/* Stake Form */}
                          <div className="flex flex-col sm:flex-row items-stretch gap-4">
                            <div className="relative flex-grow">
                              <input
                                type="number"
                                placeholder="0.0"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                className="w-full bg-surface/50 border border-border/40 rounded-lg px-3 py-2.5 text-base font-mono focus:outline-none focus:border-primary-default/40 transition-colors"
                                disabled={isLoading || isStaking}
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <span className="text-xs text-foreground-secondary">LP</span>
                                <button 
                                  className="px-2 py-0.5 text-xs font-medium bg-primary-default/20 text-primary-default rounded-full hover:bg-primary-default/30 transition-colors"
                                  onClick={() => {}}
                                  disabled={isLoading || isStaking}
                                >
                                  MAX
                                </button>
                              </div>
                            </div>
                            
                            <button 
                              className="bg-gradient-to-r from-primary-default to-primary-hover text-black font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-md"
                              disabled={isLoading || isStaking || !stakeAmount}
                            >
                              {isStaking ? (
                                <Spinner size="sm" color="default" />
                              ) : (
                                'Stake'
                              )}
                            </button>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2 p-3 bg-surface/40 rounded-lg">
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
                              className="text-primary-default/70"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M12 16v-4"></path>
                              <path d="M12 8h.01"></path>
                            </svg>
                            <span className="text-xs text-foreground-secondary">
                              Staking LP tokens earns BGT rewards at {isLoading || !vault ? '...' : (+(vault.dynamicData.apr) * 100).toFixed(2)}% APR
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Unstake Form */}
                          <div className="flex flex-col sm:flex-row items-stretch gap-4">
                            <div className="relative flex-grow">
                              <input
                                type="number"
                                placeholder="0.0"
                                value={unstakeAmount}
                                onChange={(e) => setUnstakeAmount(e.target.value)}
                                className="w-full bg-surface/50 border border-border/40 rounded-lg px-3 py-2.5 text-base font-mono focus:outline-none focus:border-primary-default/40 transition-colors"
                                disabled={isLoading || isUnstaking}
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <span className="text-xs text-foreground-secondary">LP</span>
                                <button 
                                  className="px-2 py-0.5 text-xs font-medium bg-primary-default/20 text-primary-default rounded-full hover:bg-primary-default/30 transition-colors"
                                  onClick={() => {}}
                                  disabled={isLoading || isUnstaking}
                                >
                                  MAX
                                </button>
                              </div>
                            </div>
                            
                            <button 
                              className="bg-gradient-to-r from-primary-default to-primary-hover text-black font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-md"
                              disabled={isLoading || isUnstaking || !unstakeAmount}
                            >
                              {isUnstaking ? (
                                <Spinner size="sm" color="default" />
                              ) : (
                                'Unstake'
                              )}
                            </button>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2 p-3 bg-surface/40 rounded-lg">
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
                              className="text-primary-default/70 shrink-0"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M12 16v-4"></path>
                              <path d="M12 8h.01"></path>
                            </svg>
                            <span className="text-xs text-foreground-secondary">
                              You can unstake up to <span className="font-medium">{staked.toSignificant()}</span> LP tokens
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Available Balance */}
                    <div className="flex justify-between items-center p-3 border border-border/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-foreground-secondary">Available LP Tokens:</span>
                        <span className="text-xs font-medium">{isLoading ? '...' : '0.00'}</span>
                      </div>
                      
                      <Link 
                        href="https://hub.berachain.com/pools/0x2c4a603a2aa5596287a06886862dc29d56dbc354000200000000000000000002/details/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary-default hover:underline flex items-center gap-1"
                      >
                        Get LP Tokens
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground-primary">Boost BeraFlow Validator</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-foreground-secondary">BGT Balance:</span>
                        <span className="text-xs font-medium">{bgtBalance.toSignificant()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-surface/30 border border-border/40 rounded-xl p-4">
                      <div className="flex flex-col sm:flex-row items-stretch gap-4">
                        <div className="relative flex-grow">
                          <input
                            type="number"
                            placeholder="0.0"
                            value={boostAmount}
                            onChange={(e) => setBoostAmount(e.target.value)}
                            className="w-full bg-surface/50 border border-border/40 rounded-lg px-3 py-2.5 text-base font-mono focus:outline-none focus:border-primary-default/40 transition-colors"
                            disabled={isLoading || isBoosting}
                          />
                          <button 
                            className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs font-medium bg-primary-default/20 text-primary-default rounded-full hover:bg-primary-default/30 transition-colors"
                            onClick={() => setBoostAmount(bgtBalance.toSignificant())}
                            disabled={isLoading || isBoosting}
                          >
                            MAX
                          </button>
                        </div>
                        
                        <button 
                          onClick={handleBoost}
                          className="bg-gradient-to-r from-primary-default to-primary-hover text-black font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-md"
                          disabled={isLoading || isBoosting || !boostAmount}
                        >
                          {isBoosting ? (
                            <Spinner size="sm" color="default" />
                          ) : (
                            'Boost'
                          )}
                        </button>
                      </div>
                      
                      <div className="mt-3 flex items-center gap-2 p-3 bg-surface/40 rounded-lg">
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
                          className="text-primary-default/70"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                        <span className="text-xs text-foreground-secondary">
                          Boosting our validator increases protocol stability and BGT capture efficiency
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border border-border/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-foreground-secondary">BGT Capture:</span>
                        {isLoading || !vault ? (
                          <div className="h-4 w-16 bg-border/20 rounded animate-pulse"></div>
                        ) : (
                          <span className="text-xs font-bold text-primary-default">{(+vault.dynamicData.bgtCapturePercentage * 100).toFixed(2)}%</span>
                        )}
                      </div>
                      
                      <Link 
                        href="https://hub.berachain.com/validators/0x875aaf00241b14ccd86176e4baed170df6735529afd0f38f01ecfe881cbb613058922a0372814b967e3ae9e880d88658/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary-default hover:underline flex items-center gap-1"
                      >
                        View Validator
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </WalletGuard>
        </div>

        {/* Info Card */}
        <Card className="bg-surface backdrop-blur-xl border-2 border-border/40 p-6 space-y-6">
          <h3 className="text-xl font-bold text-foreground-primary">How to earn BGT rewards</h3>
          <div className="space-y-5">
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary-default/20 border border-primary-default/40">
                <span className="text-sm font-bold text-primary-default">1</span>
              </div>
              <h4 className="text-sm font-medium text-foreground-primary mb-1">Provide Liquidity</h4>
              <p className="text-sm text-foreground-secondary">Add liquidity to the BFD-HONEY pool to receive LP tokens</p>
              <Link 
                href="https://hub.berachain.com/pools/0x2c4a603a2aa5596287a06886862dc29d56dbc354000200000000000000000002/details/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-xs text-primary-default hover:text-primary-hover transition-colors"
              >
                Go to Liquidity Pool
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary-default/20 border border-primary-default/40">
                <span className="text-sm font-bold text-primary-default">2</span>
              </div>
              <h4 className="text-sm font-medium text-foreground-primary mb-1">Stake LP Tokens</h4>
              <p className="text-sm text-foreground-secondary">Stake your BFD-HONEY LP tokens in this vault to start earning BGT rewards</p>
              <Link 
                href={vault?.metadata.url || ''} 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-xs text-primary-default hover:text-primary-hover transition-colors"
              >
                Go to Vault
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary-default/20 border border-primary-default/40">
                <span className="text-sm font-bold text-primary-default">3</span>
              </div>
              <h4 className="text-sm font-medium text-foreground-primary mb-1">Claim Rewards</h4>
              <p className="text-sm text-foreground-secondary">Claim your earned BGT rewards directly on this page using the Claim button</p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary-default/20 border border-primary-default/40">
                <span className="text-sm font-bold text-primary-default">4</span>
              </div>
              <h4 className="text-sm font-medium text-foreground-primary mb-1">Boost Project Validator</h4>
              <p className="text-sm text-foreground-secondary">Support the protocol by boosting our validator directly using the Boost button</p>
              <Link 
                href="https://hub.berachain.com/validators/0x875aaf00241b14ccd86176e4baed170df6735529afd0f38f01ecfe881cbb613058922a0372814b967e3ae9e880d88658/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-xs text-primary-default hover:text-primary-hover transition-colors"
              >
                View BeraFlow Validator
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-border/40">
              <h4 className="text-sm font-medium text-foreground-secondary mb-2">Additional Benefits</h4>
              <ul className="list-disc list-inside text-sm text-foreground-primary space-y-1.5">
                <li>Earn passive income through BGT rewards</li>
                <li>Participate in governance decisions</li>
                <li>Support the BeraFlow ecosystem</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
