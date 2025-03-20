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

export const BgtStackingClient = () => {
  const { address } = useAccount();
  const { vault, isLoading, staked, rewards } = useVaultStacking(VAULT_CA);

  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: bgtToken.address,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  const bgtBalance = TokenAmount.fromRawAmount(bgtToken, balance ?? 0 as BigintIsh);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Staking Card */}
        <div className="lg:col-span-2">
          <WalletGuard>
            <motion.div
              className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-8 py-12 w-full hover:border-primary-default/40 transition-all duration-300"
            >
              <div className="flex flex-col gap-8 w-full">
                <div className="flex items-center justify-between border-b-2 border-border/40 pb-6">
                  <div className="space-y-1">
                    <span className="text-h3 font-bold text-primary-default">BFD - HONEY</span>
                    <p className="text-sm text-foreground-secondary">Stake your BFD-HONEY LP to earn rewards</p>
                  </div>

                  <Link
                    href={vault?.metadata.url || ''}
                    target="_blank"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-default/10 border border-primary-default/30 hover:bg-primary-default/20 transition-all duration-300 group"
                  >
                    {isLoading || !vault ? (
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 bg-border/20 rounded-full animate-pulse"></span>
                        <span className="h-4 w-12 bg-border/20 rounded animate-pulse"></span>
                      </div>
                    ) : (
                      <>
                        <Image src={vault?.metadata.logoURI || ''} alt="BFD/HONEY LP" width={20} height={20} className="rounded-full" />
                        <span className="text-sm font-medium text-primary-default">HUB</span>
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
                          className="text-primary-default opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                        >
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </>
                    )}
                  </Link>
                </div>

                <div className="space-y-4">
                  <motion.div
                    className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">APR</span>
                      {isLoading || !vault ? (
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-16 bg-border/20 rounded animate-pulse w-40"></span>
                        </div>
                      ) : (
                        <span className="font-bold text-lg text-foreground-primary">{(+vault.dynamicData.apr * 100).toFixed(2)}%</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">BGT Capture</span>
                      {isLoading || !vault ? (
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-24 bg-border/20 rounded animate-pulse w-40"></span>
                        </div>
                      ) : (
                        <span className="font-bold text-lg text-foreground-primary">{(+vault.dynamicData.bgtCapturePercentage * 100).toFixed(2)}%</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">Your Stake</span>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-20 bg-border/20 rounded animate-pulse w-40"></span>
                        </div>
                      ) : (
                        <span className="font-bold text-lg text-foreground-primary">{staked.toSignificant()}</span>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">Rewards</span>
                      <div className="flex items-center gap-4">
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <span className="h-6 w-20 bg-border/20 rounded animate-pulse"></span>
                          </div>
                        ) : (
                          <span className="font-bold text-lg text-foreground-primary">{rewards.toSignificant()} BGT</span>
                        )}
                        <button 
                          className="px-5 py-2 bg-gradient-to-r from-primary-default to-primary-hover text-black text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-md"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Spinner size="sm" color="default" />
                          ) : (
                            'Claim'
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-foreground-secondary flex items-center gap-1">
                          Boost Validator
                          <div className="relative group">
                            <button className="text-foreground-secondary/70 hover:text-primary-default transition-colors duration-200">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                              </svg>
                            </button>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-surface/90 backdrop-blur-sm border border-border/60 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                              <p className="text-xs text-foreground-secondary">Your BGT tokens will be used to boost our validator, helping to secure the network and increase protocol stability.</p>
                            </div>
                          </div>
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="relative flex-grow">
                          <input
                            type="number"
                            placeholder="0.0"
                            className="w-full bg-surface/50 border border-border/40 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary-default/40 transition-colors pr-16"
                            disabled={isLoading}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <button 
                              className="px-2 py-0.5 text-[11px] font-medium bg-primary-default/20 text-primary-default rounded-full hover:bg-primary-default/30 transition-colors"
                              disabled={isLoading}
                            >
                              {bgtBalance.toSignificant()} BGT
                            </button>
                          </div>
                        
                        </div>
                        
                        <button 
                          className="bg-gradient-to-r from-primary-default/80 to-primary-hover/80 text-black font-bold py-2 px-5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Spinner size="sm" color="default" />
                          ) : (
                            'Boost'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
