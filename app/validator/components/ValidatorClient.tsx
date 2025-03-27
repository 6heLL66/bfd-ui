'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import { useValidator } from '@/features/validator/useValidator';
import { bgtToken, honeyToken, VALIDATOR_ID, VAULT_CA } from '@/config/berachain';
import { formatCurrency } from '@/app/treasury/components/TokenDistributionChart';
import { useVaultStacking } from '@/features/stacking/useVaultStacking';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import React, { useEffect, useState } from 'react';
import { getTokenImageUrl } from '@/shared/utils';
import { BoostModal } from './BoostModal';
import Countdown from 'react-countdown';
import { Button } from '@tremor/react';
import { createClaimBGTToast } from '@/app/pool/components/toasts';
import { RemoveBoostModal } from './RemoveBoostModal';

export const ValidatorClient = () => {
  const { isConnected } = useAccount();
  const {
    validator,
    boostedQueue,
    rewards: validatorRewards,
    boosted,
    dropBoostQueue,
    availableForBoost,
    availableForDropBoost,
    apr,
    weeklyUsdPerBgt,
    claimAllRewards,
    queueBoost,
    cancelBoost,
    activateBoost,
    queueDropBoost,
    cancelDropBoost,
    dropBoost,
    refetchAll,
  } = useValidator(VALIDATOR_ID);
  const { rewards, vault, claim } = useVaultStacking(VAULT_CA);

  const [readyItems, setReadyItems] = useState<string[]>([]);

  useEffect(() => {
    if (boostedQueue.timeReady < Date.now()) {
      setReadyItems([...readyItems, boostedQueue.timeReady.toString()]);
    } else if (readyItems.includes(boostedQueue.timeReady.toString())) {
      setReadyItems(readyItems.filter(item => item !== boostedQueue.timeReady.toString()));
    }
    if (dropBoostQueue.timeReady < Date.now()) {
      setReadyItems([...readyItems, dropBoostQueue.timeReady.toString()]);
    } else if (readyItems.includes(dropBoostQueue.timeReady.toString())) {
      setReadyItems(readyItems.filter(item => item !== dropBoostQueue.timeReady.toString()));
    }
  }, [boostedQueue, dropBoostQueue]);

  const countdownRenderer = ({ hours, minutes }: { hours: number; minutes: number }) => {
    return (
      <span>
        <span className="font-bold text-primary-default">
          {hours > 0 ? `${hours}H ` : ''}
          {minutes}M{' '}
        </span>
        until confirmation is available
      </span>
    );
  };

  const [isBoostModalOpen, setIsBoostModalOpen] = React.useState(false);
  const [isRemoveBoostModalOpen, setIsRemoveBoostModalOpen] = React.useState(false);

  const cancelQueuedBoost = async () => {
    cancelBoost(boostedQueue.amount.amount);
  };

  const confirmBoost = async () => {
    activateBoost();
  };

  const handleClaim = async () => {
    const promise = claim();

    createClaimBGTToast(promise, rewards.toSignificant());

    refetchAll();
  };

  if (!validator) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Left Column - Main Validator Info */}
        <div className="col-span-12 lg:col-span-8 space-y-6 flex flex-col">
          {/* Validator Card - Redesigned */}
          <div className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 hover:border-primary-default/40 transition-all duration-300">
            {/* Header with validator info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16">
                  <Image src={validator?.metadata.logoURI ?? ''} alt={validator?.metadata.name ?? ''} width={64} height={64} className="rounded-full border-2 border-border/40" />
                </div>
                <div>
                  <h1 className="text-xl md:text-h3 font-bold">{validator?.metadata.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Link
                      href={`https://berascan.com/address/${validator?.operator}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 bg-surface text-foreground-secondary text-xs rounded-full border border-border/40 hover:border-primary-default/40 transition-colors"
                    >
                      Operator:{' '}
                      <span className="font-mono">
                        {validator?.operator.slice(0, 6)}...{validator?.operator.slice(-4)}
                      </span>
                    </Link>
                    <Link
                      href={validator?.metadata.website ?? ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 bg-surface text-foreground-secondary text-xs rounded-full border border-border/40 hover:border-primary-default/40 transition-colors"
                    >
                      {validator?.metadata.website}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-foreground-secondary text-sm mb-6">{validator?.metadata.description}</p>

            {/* Validator Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface/50 rounded-lg p-4 border border-border/30 hover:border-primary-default/30 transition-all">
                <div className="text-foreground-secondary text-sm mb-1">BGT emitted</div>
                <div className="text-foreground-primary text-xl font-semibold">{formatCurrency(Number(validator?.dynamicData.allTimeDistributedBGTAmount), '0.00a')} BGT</div>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-border/30 hover:border-primary-default/30 transition-all">
                <div className="text-foreground-secondary text-sm mb-1">BERA staked</div>
                <div className="text-foreground-primary text-xl font-semibold">{formatCurrency(Number(validator?.dynamicData.stakedBeraAmount), '0.00a')}</div>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-border/30 hover:border-primary-default/30 transition-all">
                <div className="text-foreground-secondary text-sm mb-1">Boosted</div>
                <div className="text-foreground-primary text-xl font-semibold">{formatCurrency(Number(validator?.dynamicData.activeBoostAmount), '0.00a')} BGT</div>
              </div>
            </div>
          </div>

          {/* Performance Cards Row */}
          <div className="flex gap-6">
            {/* Boost APY Card */}
            <div
              className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl hover:border-primary-default/40 shadow-primary-default/10 p-5 transition-all duration-300"
              style={{ flexGrow: 1 }}
            >
              <div className="flex items-center mb-4 ">
                <div className="bg-yellow-500/10 rounded-full p-2 mr-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-sm font-medium text-foreground-primary">Boost APR</h3>
                <div className="ml-3 mb-2 relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-default rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-default rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-bold text-primary-default">{Number(Number(apr) * 100).toFixed(2)}%</span>
                </div>

                <div className="flex items-center mt-2 bg-surface/50 rounded-lg p-2 border border-border/30">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-surface/80">
                    <Image src={getTokenImageUrl(honeyToken)} alt="HONEY" width={24} height={24} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-foreground-primary text-sm font-medium">~{formatCurrency(weeklyUsdPerBgt, '$0.0000a')}/weekly HONEY per BGT</div>
                      <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-500 text-xs rounded-md font-medium">High Yield</span>
                    </div>
                    <div className="text-foreground-secondary text-xs">Weekly reward rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reward Vault Card */}
            <div
              style={{ flexGrow: 2 }}
              className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl hover:border-primary-default/40 shadow-primary-default/10 p-5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-primary-default/10 rounded-full p-2 mr-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 11V8C20 7.46957 19.7893 6.96086 19.4142 6.58579C19.0391 6.21071 18.5304 6 18 6H6C5.46957 6 4.96086 6.21071 4.58579 6.58579C4.21071 6.96086 4 7.46957 4 8V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V15"
                        stroke="var(--primary-default)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 10V14M15 11V13M9 12V14" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-medium text-foreground-primary">Reward Vault</h3>
                  <div className="ml-2 relative">
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary-default rounded-full animate-ping opacity-75"></div>
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary-default rounded-full"></div>
                  </div>
                </div>
                <div className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-md text-xs font-medium">+{(Number(vault?.dynamicData.apr) * 100).toFixed(2)}% APR</div>
              </div>

              <div className="flex items-center justify-between py-3 px-4 bg-surface/50 rounded-lg border border-border/20 mb-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-primary-default/20 flex items-center justify-center mr-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7"
                        stroke="var(--primary-default)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-foreground-primary text-sm font-medium">{rewards.toSignificant()} BGT</div>
                    <div className="text-foreground-secondary text-xs">Available to claim</div>
                  </div>
                </div>
                <button
                  onClick={handleClaim}
                  className="px-4 py-1.5 bg-gradient-to-r from-primary-default to-primary-hover hover:primary-hover hover:to-primary-default text-black font-medium rounded-lg text-xs transition-all duration-200 shadow-sm hover:shadow"
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
                    <path d="M9 11l3 3l8-8" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Earn BGT</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Incentives Earned Card */}
          <div className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-5 hover:border-primary-default/40 transition-all duration-300 flex-1">
            <h4 className="text-sm font-medium mb-3 text-foreground-primary">Incentives Earned</h4>

            {Number(validatorRewards?.length) > 0 ? (
              <div className="space-y-3">
                {validatorRewards?.map((reward, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 bg-surface/50 rounded-lg border border-border/30 hover:border-primary-default/30 transition-colors"
                  >
                    {reward.token && reward.price && <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <Image className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-surface/80" src={getTokenImageUrl(reward.token)} alt={reward.token?.symbol ?? ''} width={24} height={24} />
                        <span className="text-foreground-primary text-sm font-medium">{reward.token.symbol}</span>
                      </div>
                      <div>
                        <div className="text-foreground-primary text-sm font-medium flex gap-2 items-center">
                          <span className="text-foreground-secondary text-xs">~${reward.amount.mulDownFixed(reward.price.amount ?? 0).toSignificant(4)}</span>
                          {reward.amount.toSignificant()}
                        </div>
                      </div>
                    </div>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-sm text-foreground-secondary">Your claimable incentive rewards will show here.</p>
              </div>
            )}
            {Number(validatorRewards?.length) > 0 && <Button className="w-full bg-primary-default border-none mt-5 rounded-md font-bold hover:bg-primary-hover text-md text-[#000]" onClick={claimAllRewards}>Claim all</Button>}
          </div>

          
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col space-y-6 h-full">
          <div className="flex-1">
            <AnimatedBorder>
              <div className="bg-surface min-h-[400px] backdrop-blur-xl rounded-2xl h-full border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-5 hover:border-primary-default/40 transition-all duration-300">
                <div className="flex justify-between items-center border-b border-border/40 pb-2 mb-3">
                  <h3 className="text-lg font-semibold text-foreground-primary">Your Boosts</h3>
                  <button
                    onClick={() => setIsBoostModalOpen(true)}
                    className="mt-2 md:mt-0 px-5 py-1 bg-gradient-to-r from-primary-default to-primary-hover text-black font-bold rounded-lg shadow-lg shadow-primary-default/20 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-default/30 active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-2">
                      <LightningBoltIcon className="w-4 h-4" />
                      <span>Boost</span>
                    </div>
                  </button>
                </div>

                <div className="p-2 h-full">
                  <div className="mb-3 h-full">
                    <h4 className="text-sm font-medium mb-2 text-foreground-primary flex items-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Active Boosts
                    </h4>
                    <div className="flex flex-col items-center justify-center py-3 bg-surface/40 rounded-xl border border-border/30 h-full">
                      {boosted.amount > BigInt(0) ? (
                        <div className="w-full px-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="px-2 py-0.5 bg-primary-default/20 text-primary-default rounded-md text-xs font-medium">Active</div>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-7 h-7 rounded-full bg-primary-default/20 flex items-center justify-center mr-2 border-1 border-primary-default">
                                <LightningBoltIcon className="w-4 h-4 text-primary-default" />
                              </div>
                              <div>
                                <div className="flex gap-1 items-center text-foreground-primary text-sm font-medium">
                                  <Image src={getTokenImageUrl(bgtToken)} className="rounded-full" alt="BGT" width={16} height={16} />
                                  {boosted.toSignificant()} BGT
                                </div>
                                <div className="text-foreground-secondary text-xs mt-0.5">Boosting {validator?.metadata.name}</div>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setIsRemoveBoostModalOpen(true);
                            }}
                            className="mt-3 w-full px-3 py-1.5 bg-surface border border-border/40 text-foreground-primary font-medium rounded-lg text-xs transition-all duration-200 hover:border-primary-default/40 flex items-center justify-center"
                          >
                            Remove Boost
                          </button>
                        </div>
                      ) : (
                        <>
                          <motion.div
                            className="relative mb-2"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            animate={{
                              boxShadow: [
                                '0 0 0 rgba(var(--primary-default-rgb), 0.4)',
                                '0 0 20px rgba(var(--primary-default-rgb), 0.2)',
                                '0 0 0 rgba(var(--primary-default-rgb), 0.4)',
                              ],
                            }}
                            transition={{
                              boxShadow: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: 'reverse',
                              },
                            }}
                          >
                            <div className="absolute inset-0 bg-primary-default/20 rounded-full blur-xl"></div>
                            <div className="relative bg-gradient-to-br from-primary-default/20 to-primary-default/5 h-14 w-14 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary-default/30">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="var(--primary-default)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <div className="absolute -top-1 -right-1 h-5 w-5 bg-primary-default rounded-full flex items-center justify-center text-black font-bold text-xs animate-bounce">
                              +
                            </div>
                          </motion.div>
                          <p className="text-sm text-foreground-secondary text-center max-w-xs">You have no active boosts</p>
                        </>
                      )}
                    </div>
                  </div>

                  {boostedQueue.amount.amount > 0 && (
                    <>
                      <div className="mb-3 mt-8 border-t border-border/30"></div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2 text-foreground-primary flex items-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <path
                              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                              stroke="var(--primary-default)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Queued Boost
                        </h4>

                        <div className="rounded-xl bg-primary-default/10 p-3 border border-primary-default/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="px-2 py-0.5 bg-primary-default/20 text-primary-default rounded-md text-xs font-medium">
                              {!readyItems.includes(boostedQueue.timeReady.toString()) ? 'Pending' : 'Ready'}
                            </div>
                          </div>

                          {boostedQueue.amount.amount > 0 ? (
                            <>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <div className="w-7 h-7 rounded-full bg-primary-default/20 flex items-center justify-center mr-2 border-1 border-primary-default">
                                    <LightningBoltIcon className="w-4 h-4 text-primary-default" />
                                  </div>
                                  <div>
                                    <div className="flex gap-1 items-center text-foreground-primary text-sm font-bold">
                                      <Image src={getTokenImageUrl(bgtToken)} className="rounded-full" alt="BGT" width={16} height={16} />
                                      {boostedQueue.amount.toSignificant()} BGT
                                    </div>
                                    <div className="text-foreground-secondary text-xs mt-0.5">
                                      {!readyItems.includes(boostedQueue.timeReady.toString()) ? (
                                        <Countdown
                                          date={boostedQueue.timeReady}
                                          renderer={countdownRenderer}
                                          onComplete={() => setReadyItems([...readyItems, boostedQueue.timeReady.toString()])}
                                        />
                                      ) : (
                                        'Awaiting confirmation'
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <Button
                                  disabled={!readyItems.includes(boostedQueue.timeReady.toString())}
                                  onClick={() => confirmBoost()}
                                  className="flex-1 border-none px-3 py-1.5 bg-gradient-to-r from-primary-default to-primary-hover text-black font-medium rounded-lg text-xs transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center"
                                >
                                  Confirm
                                </Button>
                                <Button
                                  onClick={() => cancelQueuedBoost()}
                                  className="flex-1 px-3 py-1.5 bg-surface border border-border/40 text-foreground-primary font-medium rounded-lg text-xs transition-all duration-200 hover:border-primary-default/40 flex items-center justify-center"
                                >
                                  Cancel
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-3">
                              <p className="text-sm text-foreground-secondary">No pending boosts in queue</p>
                              <button
                                onClick={() => setIsBoostModalOpen(true)}
                                className="mt-2 px-3 py-1 bg-gradient-to-r from-primary-default to-primary-hover text-black font-medium rounded-lg text-xs transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center mx-auto"
                              >
                                <span className="mr-1">+</span> Add Boost
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {dropBoostQueue.amount.amount > 0 && (
                    <>
                      <div className="mb-3 mt-8 border-t border-border/30"></div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2 text-foreground-primary flex items-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                            <path
                              d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                              stroke="var(--primary-default)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Queued Drop Boost
                        </h4>

                        <div className="rounded-xl bg-primary-default/10 p-3 border border-primary-default/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="px-2 py-0.5 bg-primary-default/20 text-primary-default rounded-md text-xs font-medium">
                              {!readyItems.includes(dropBoostQueue.timeReady.toString()) ? 'Pending' : 'Ready'}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-7 h-7 rounded-full bg-primary-default/20 flex items-center justify-center mr-2 border-1 border-primary-default">
                                <LightningBoltIcon className="w-4 h-4 text-primary-default" />
                              </div>
                              <div>
                                <div className="flex gap-1 items-center text-foreground-primary text-sm font-bold text-red-500">
                                  <Image src={getTokenImageUrl(bgtToken)} className="rounded-full" alt="BGT" width={16} height={16} />- {dropBoostQueue.amount.toSignificant()} BGT
                                </div>
                                <div className="text-foreground-secondary text-xs mt-0.5">
                                  {!readyItems.includes(dropBoostQueue.timeReady.toString()) ? (
                                    <Countdown
                                      date={dropBoostQueue.timeReady}
                                      renderer={countdownRenderer}
                                      onComplete={() => setReadyItems([...readyItems, dropBoostQueue.timeReady.toString()])}
                                    />
                                  ) : (
                                    'Awaiting confirmation for drop'
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button
                              disabled={!readyItems.includes(dropBoostQueue.timeReady.toString())}
                              onClick={() => dropBoost()}
                              className="flex-1 border-none px-3 py-1.5 bg-gradient-to-r from-primary-default to-primary-hover text-black font-medium rounded-lg text-xs transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center"
                            >
                              Confirm Drop
                            </Button>
                            <Button
                              onClick={() => cancelDropBoost(dropBoostQueue.amount.amount)}
                              className="flex-1 px-3 py-1.5 bg-surface border border-border/40 text-foreground-primary font-medium rounded-lg text-xs transition-all duration-200 hover:border-primary-default/40 flex items-center justify-center"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {!isConnected && (
                    <div className="mt-3 pt-3 border-t border-border/20 flex flex-col items-center gap-4">
                      <p className="text-sm text-foreground-secondary mb-2 text-center">Connect your wallet to start boosting and earning rewards.</p>
                      <ConnectButton />
                    </div>
                  )}
                </div>
              </div>
            </AnimatedBorder>
          </div>

          {/* What are validator boosts - Separate Card */}
          <div className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-4 hover:border-primary-default/40 transition-all duration-300 flex flex-1 flex-col">
            <h4 className="text-sm font-medium mb-2 text-foreground-primary">What are validator boosts?</h4>
            <p className="text-xs text-foreground-secondary">
              Boosting validators allows you to support network security while earning additional rewards from transaction fees and emissions.
            </p>
            <div className="mt-3 p-2 bg-primary-default/5 border border-primary-default/10 rounded-lg">
              <h5 className="text-xs font-medium text-foreground-primary mb-1">Benefits of Boosting</h5>
              <ul className="text-xs text-foreground-secondary">
                <li className="flex items-start mb-1">
                  <span className="mr-1">•</span>
                  <span>Higher APY compared to standard staking</span>
                </li>
                <li className="flex items-start mb-1">
                  <span className="mr-1">•</span>
                  <span>Support validators you trust</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-1">•</span>
                  <span>Contribute to network security</span>
                </li>
              </ul>
            </div>
            <div className="mt-auto pt-3 border-t border-border/20">
              <Link
                href="https://docs.berachain.com/learn/guides/boost-a-validator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs text-primary-default hover:underline"
              >
                <span>Learn more about boosting</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isBoostModalOpen && <BoostModal isOpen={isBoostModalOpen} onClose={() => setIsBoostModalOpen(false)} availableBGT={availableForBoost} onQueueBoost={queueBoost} />}

      {isRemoveBoostModalOpen && (
        <RemoveBoostModal isOpen={isRemoveBoostModalOpen} onClose={() => setIsRemoveBoostModalOpen(false)} availableBGT={availableForDropBoost} onQueueDropBoost={queueDropBoost} />
      )}
    </div>
  );
};

const AnimatedBorder = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="snake-border-container">
      <div className="snake-border-inner">{children}</div>

      <style jsx>{`
        .snake-border-container {
          --border-width: 2px;
          --border-radius: 1rem;
          position: relative;
          border-radius: var(--border-radius);
          padding: 0;
          overflow: hidden;
        }

        .snake-border-inner {
          position: relative;
          z-index: 10;
          height: 100%;
          width: 100%;
          background: var(--surface);
          border-radius: calc(var(--border-radius) - 1px);
          margin: var(--border-width);
          overflow: hidden;
        }

        .snake-border-container::before {
          content: '';
          position: absolute;
          z-index: 1;
          inset: -200%;
          background: linear-gradient(to right, transparent 40%, var(--primary-default) 50%, transparent 60%);
          width: 500%;
          height: 500%;
          animation: rotate 6s linear infinite;
          transform-origin: center center;
          will-change: transform;
        }

        .snake-border-container::after {
          content: '';
          position: absolute;
          z-index: 2;
          inset: -200%;
          background: linear-gradient(to bottom, transparent 40%, var(--primary-default) 50%, transparent 60%);
          width: 500%;
          height: 500%;
          animation: rotate 6s linear infinite;
          animation-delay: -1.5s;
          transform-origin: center center;
          will-change: transform;
          filter: blur(5px);
          opacity: 0.5;
        }

        @keyframes rotate {
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
