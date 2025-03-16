'use client';

import { motion } from 'framer-motion';
import { WalletGuard } from '@/shared/components/WalletGuard';
import { Button, Card } from '@heroui/react';
import { useEffect, useState } from 'react';
import { useBFDStacking } from '@/features/stacking/useBFDStacking';
import { useAccount } from 'wagmi';
import { getBalance } from 'wagmi/actions';
import { wagmiConfig } from '@/config/wagmi';
import { bfdToken, STACKING_CA } from '@/config/berachain';
import { TokenAmount } from '@berachain-foundation/berancer-sdk';
import { useApprove } from '@/shared/hooks/useApprove';
import { ErrorToast, SuccessToast, PendingToast } from './toasts';
import { createApproveToast } from '@/app/swap/toasts';
import { toast } from 'react-toastify';

export const BfdStackingClient = () => {
  const { address } = useAccount();
  const { approve, checkAllowance } = useApprove();
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');
  const [bfdBalance, setBfdBalance] = useState(0);
  const [unstaking, setUnstaking] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [cancellingUnstake, setCancellingUnstake] = useState<number>();

  const [isStaking, setIsStaking] = useState(false);

  const { totalStaked, staked, unstaked, availableForClaim, stake, unstake, cancelUnstake, claim } = useBFDStacking();

  const refreshBalance = async () => {
    if (!address) return;

    getBalance(wagmiConfig, {
      token: bfdToken.address,
      address: address as `0x${string}`,
    }).then(token1Balance => {
      const balance = +token1Balance.value.toString() / 10 ** bfdToken.decimals;
      setBfdBalance(+token1Balance.value.toString() > 1e2 ? balance : 0);
    });
  };

  const handleCancelUnstake = async (index: number) => {
    if (!address) return;

    setCancellingUnstake(index);

    cancelUnstake(index).catch(() => {
      toast.error('Failed to cancel unstake');
    }).finally(() => {
      setCancellingUnstake(index);
    });
  };

  const handleClaim = async () => {
    if (!address) return;

    setClaiming(true);

    const promise = claim()
      .then(() => {
        refreshBalance();
      })
      .finally(() => {
        setClaiming(false);
      });

    toast.promise(promise, {
      pending: {
        render() {
          return <PendingToast amount={availableForClaim.toSignificant()} operation="Claim" />;
        },
        icon: false,
      },
      success: {
        render() {
          return <SuccessToast amount={availableForClaim.toSignificant()} operation="Claim" />;
        },
        icon: false,
      },
      error: {
        render() {
          return <ErrorToast operation="claim" />;
        },
        icon: false,
      },
    });
  };

  const handleStake = async () => {
    if (!stakeAmount || !address) return;
    setIsStaking(true);
    const amount = TokenAmount.fromHumanAmount(bfdToken, stakeAmount as `${number}`);

    const needApprove = await checkAllowance(STACKING_CA, amount.amount, bfdToken);

    if (needApprove) {
      const promise = approve(STACKING_CA, amount.amount, bfdToken) as Promise<void>;

      createApproveToast(promise, bfdToken.symbol ?? '', amount.toSignificant(), false, 'stake');

      await promise;
    }

    const promise = stake(amount.amount)
      .then(() => {
        setStakeAmount('');
        refreshBalance();
      })
      .finally(() => {
        setIsStaking(false);
      });

    toast.promise(promise, {
      pending: {
        render() {
          return <PendingToast amount={stakeAmount} operation="Stake" />;
        },
        icon: false,
      },
      success: {
        render() {
          return <SuccessToast amount={stakeAmount} operation="Stake" />;
        },
        icon: false,
      },
      error: {
        render() {
          return <ErrorToast operation="Stake" />;
        },
        icon: false,
      },
    });
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || !address) return;
    setUnstaking(true);

    const amount = TokenAmount.fromHumanAmount(bfdToken, unstakeAmount as `${number}`);

    const promise = unstake(amount.amount)
      .then(() => {
        setUnstakeAmount('');
        refreshBalance();
      })
      .finally(() => {
        setUnstaking(false);
      });

    toast.promise(promise, {
      pending: {
        render() {
          return <PendingToast amount={unstakeAmount} operation="Unstake" />;
        },
        icon: false,
      },
      success: {
        render() {
          return <SuccessToast amount={unstakeAmount} operation="Unstake" />;
        },
        icon: false,
      },
      error: {
        render() {
          return <ErrorToast operation="Unstake" />;
        },
        icon: false,
      },
    });
  };

  useEffect(() => {
    if (!address) return;

    refreshBalance();
  }, [address]);

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return Math.max(0, diffDays);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WalletGuard>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-surface/30 backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl p-8 py-12 w-full hover:border-border/60 transition-all duration-300"
            >
              <div className="flex flex-col gap-8 w-full">
                <div className="flex items-center justify-between border-b-2 border-border/40 pb-6">
                  <div className="space-y-1">
                    <span className="text-h3 font-bold text-primary-default">Stake BFD</span>
                    <p className="text-sm text-white/70">Lock your BFD to get gathering allocation</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-xl bg-surface/30 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-white/70">Total Staked</span>
                      <span className="font-bold text-lg text-white">{totalStaked.toSignificant()} BFD</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-xl bg-surface/30 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-white/70">Your Stake</span>
                      <span className="font-bold text-lg text-white">{staked.toSignificant()} BFD</span>
                    </div>
                  </motion.div>
                </div>

                <div className="border-b border-border/60">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => setActiveTab('stake')}
                      className={`py-2 font-medium transition-colors ${
                        activeTab === 'stake' ? 'text-primary-default border-b-2 border-primary-default' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Stake
                    </button>
                    <button
                      onClick={() => setActiveTab('unstake')}
                      className={`py-2 font-medium transition-colors ${
                        activeTab === 'unstake' ? 'text-primary-default border-b-2 border-primary-default' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      Unstake
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mt-4">
                  {activeTab === 'stake' ? (
                    <>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="0.0"
                          value={stakeAmount}
                          onChange={e => setStakeAmount(e.target.value)}
                          className="w-full bg-surface/50 border-2 border-border/40 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-primary-default/40 transition-colors text-white"
                        />
                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium bg-primary-default/20 text-primary-default rounded-full hover:bg-primary-default/30 transition-colors"
                          onClick={() => setStakeAmount(bfdBalance.toString())}
                        >
                          MAX
                        </button>
                      </div>
                      <div className="flex justify-between text-sm text-white/70 px-1">
                        <span>Available: {bfdBalance.toLocaleString()} BFD</span>
                      </div>
                      <Button
                        size="lg"
                        onPress={handleStake}
                        isLoading={isStaking}
                        className="w-full bg-primary-default text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-md"
                      >
                        Stake BFD
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="0.0"
                          value={unstakeAmount}
                          onChange={e => setUnstakeAmount(e.target.value)}
                          className={`w-full bg-surface/50 border-2 border-border/40 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-primary-default/40 transition-colors text-white`}
                        />
                        <button
                          className={`absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium bg-primary-default/20 text-primary-default rounded-full hover:bg-primary-default/30 transition-colors`}
                          onClick={() => setUnstakeAmount(staked.toSignificant())}
                        >
                          MAX
                        </button>
                      </div>
                      <div className="flex justify-between text-sm text-white/70 px-1">
                        <span>Staked: {staked.toSignificant()} BFD</span>
                        <span>Unstaking Period: 7 days</span>
                      </div>
                      <Button
                        onPress={handleUnstake}
                        isLoading={unstaking}
                        className="w-full bg-primary-default text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-md"
                        size="lg"
                      >
                        Unstake BFD
                      </Button>
                    </>
                  )}
                </div>

                <div className="mt-8 border-t-2 border-border/40 pt-6">
                  <h3 className="text-xl font-bold text-white mb-4">Your Unstaking Requests</h3>

                  <div className="mb-6">
                    <div className="p-6 rounded-xl bg-surface/30 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg mb-3">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div>
                          <h4 className="text-md font-medium text-white mb-1">Ready to Claim</h4>
                        </div>
                        <span className="font-bold text-2xl text-white">
                          {availableForClaim.toSignificant()} <span className="text-primary-default">BFD</span>
                        </span>
                      </div>
                      <Button
                        isDisabled={availableForClaim.amount <= 0}
                        onPress={handleClaim}
                        isLoading={claiming}
                        className="w-full bg-primary-default text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Claim All
                      </Button>
                    </div>
                  </div>

                  {/* Pending unstakes section */}
                  {unstaked?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-white mb-4">Unstakes queue</h4>

                      <div className="space-y-4">
                        {unstaked.map((unstake, index) => {
                          const isCompleted = unstake.unlockTime < new Date();

                          return (
                            <div
                              key={unstake.unlockTime.valueOf()}
                              className={
                                'p-6 rounded-xl bg-surface/30 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg ' +
                                (isCompleted ? 'opacity-70' : '')
                              }
                            >
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-bold text-xl text-white">
                                  {unstake.amount.toSignificant()} <span className="text-primary-default">BFD</span>
                                </span>
                                <span className="text-xs px-3 py-1.5 bg-primary-default/20 text-primary-default rounded-full font-medium">
                                  {isCompleted ? 'Completed' : `${getDaysRemaining(unstake.unlockTime)} days left`}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-white/70 mb-3">
                                <span>
                                  {!isCompleted ? 'Completes' : 'Completed'}: {unstake.unlockTime.toLocaleDateString()}
                                </span>
                              </div>
                              {!isCompleted && (
                                <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                                  <div
                                    className="bg-primary-default h-2 rounded-full"
                                    style={{
                                      width: `${((7 - getDaysRemaining(unstake.unlockTime)) / 7) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                              )}
                              {!isCompleted && (
                                <Button
                                  isLoading={cancellingUnstake === index}
                                  onPress={() => handleCancelUnstake(index)}
                                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 border border-border/40 hover:border-border/60"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Cancel Unstake
                                </Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </WalletGuard>
        </div>

        <Card className="bg-surface/80 backdrop-blur-xl border-2 border-border/40 p-6 space-y-6 hover:border-border/60 transition-all duration-300">
          <h3 className="text-xl font-bold text-primary-default">Staking Info</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Unstaking Period</h4>
              <p className="text-white">7 days unstaking period for withdrawing BFD tokens</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Allocation</h4>
              <p className="text-white">Each staker gets a unique gathering allocation based on the amount of BFD they stake</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Benefits</h4>
              <ul className="list-disc list-inside text-white space-y-2">
                <li>Get gathering allocation proportional to your stake</li>
                <li>Participate in governance decisions</li>
                <li>Support the BFD ecosystem</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
