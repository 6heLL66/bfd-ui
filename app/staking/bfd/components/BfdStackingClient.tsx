'use client';

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

  const { totalStaked, staked, unstaked, availableForClaim, totalSupply, stake, unstake, cancelUnstake, claim } = useBFDStacking();

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
      setCancellingUnstake(undefined);
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
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WalletGuard>
            <div className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-8 py-12 w-full hover:border-primary-default/40 transition-all duration-300">
              <div className="flex flex-col gap-8 w-full">
                <div className="flex items-center justify-between border-b-2 border-border/40 pb-6">
                  <div className="space-y-1">
                    <span className="text-h3 font-bold text-primary-default">Stake $BFD</span>
                    <p className="text-sm text-foreground-secondary">Stake $BFD to receive a share of the gathering allocation.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">Total Staked</span>
                      <span className="font-bold text-lg text-foreground-primary flex items-center gap-2">{totalStaked.toSignificant()} $BFD <span className="text-sm text-foreground-secondary">{totalSupply.amount && (+totalStaked.divUpFixed(totalSupply.amount).toSignificant()).toFixed(2)}%</span></span>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">Your Stake</span>
                      <span className="font-bold text-lg text-foreground-primary">{staked.toSignificant()} $BFD</span>
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">Available to Claim</span>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg text-foreground-primary">{availableForClaim.toSignificant()} $BFD</span>
                        {availableForClaim.amount > 0 && (
                          <Button
                            onPress={handleClaim}
                            isLoading={claiming}
                            className="px-5 py-2 bg-gradient-to-r from-primary-default to-primary-hover text-black text-sm font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center shadow-md"
                          >
                            Claim
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-border/60">
                  <div className="flex space-x-6">
                    <button
                      onClick={() => setActiveTab('stake')}
                      className={`py-2 font-medium transition-colors ${
                        activeTab === 'stake' ? 'text-primary-default border-b-2 border-primary-default' : 'text-foreground-secondary hover:text-foreground-primary'
                      }`}
                    >
                      Stake
                    </button>
                    <button
                      onClick={() => setActiveTab('unstake')}
                      className={`py-2 font-medium transition-colors ${
                        activeTab === 'unstake' ? 'text-primary-default border-b-2 border-primary-default' : 'text-foreground-secondary hover:text-foreground-primary'
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
                          className="w-full bg-surface/50 border-2 border-border/40 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-primary-default/40 transition-colors text-foreground-primary"
                        />
                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium bg-primary-default/20 text-primary-default rounded-full hover:bg-primary-default/30 transition-colors"
                          onClick={() => setStakeAmount(bfdBalance.toString())}
                        >
                          MAX
                        </button>
                      </div>
                      <div className="flex justify-between text-sm text-foreground-secondary px-1">
                        <span>Available: {bfdBalance.toLocaleString()} $BFD</span>
                      </div>
                      <Button
                        size="lg"
                        onPress={handleStake}
                        isLoading={isStaking}
                        className="w-full bg-gradient-to-r from-primary-default to-primary-hover text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-md"
                      >
                        Stake $BFD
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
                          className={`w-full bg-surface/50 border-2 border-border/40 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-primary-default/40 transition-colors text-foreground-primary`}
                        />
                        <button
                          className={`absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium bg-primary-default/20 text-primary-default rounded-full hover:bg-primary-default/30 transition-colors`}
                          onClick={() => setUnstakeAmount(staked.toSignificant())}
                        >
                          MAX
                        </button>
                      </div>
                      <div className="flex justify-between text-sm text-foreground-secondary px-1">
                        <span>Staked: {staked.toSignificant()} $BFD</span>
                        <span>Unstaking Period: 7 days</span>
                      </div>
                      <Button
                        onPress={handleUnstake}
                        isLoading={unstaking}
                        className="w-full bg-gradient-to-r from-primary-default to-primary-hover text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity shadow-md"
                        size="lg"
                      >
                        Unstake $BFD
                      </Button>
                    </>
                  )}
                </div>

                {/* Unstaking Requests Section */}
                {unstaked && unstaked.length > 0 && (
                  <div className="mt-8 border-t-2 border-border/40 pt-6">
                    <h3 className="text-xl font-bold text-foreground-primary mb-4">Your Unstaking Requests</h3>
                    
                    <div className="space-y-4">
                      {unstaked.map((unstake, index) => {
                        const isCompleted = unstake.unlockTime < new Date();

                        return (
                          <div
                            key={unstake.unlockTime.valueOf()}
                            className="p-6 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-bold text-xl text-foreground-primary">
                                {unstake.amount.toSignificant()} <span className="text-primary-default">$BFD</span>
                              </span>
                              <span className="text-xs px-3 py-1.5 bg-primary-default/20 text-primary-default rounded-full font-medium">
                                {isCompleted ? 'Completed' : `${getDaysRemaining(unstake.unlockTime)} days left`}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-foreground-secondary mb-3">
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
                                className="w-full bg-white/10 hover:bg-white/20 text-foreground-primary font-medium py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 border border-border/40 hover:border-border/60"
                              >
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    Cancel Unstake
                                  </>
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
          </WalletGuard>
        </div>

        <Card className="bg-surface backdrop-blur-xl border-2 border-border/40 p-6 space-y-6 hover:border-border/60 transition-all duration-300">
          <h3 className="text-xl font-bold text-primary-default">Staking Info</h3>
          <div className="space-y-5">
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary-default/20 border border-primary-default/40">
                <span className="text-sm font-bold text-primary-default">1</span>
              </div>
              <h4 className="text-sm font-medium text-foreground-primary mb-1">Stake $BFD</h4>
              <p className="text-sm text-foreground-secondary">Stake your $BFD tokens to receive a share of the gathering allocation.</p>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary-default/20 border border-primary-default/40">
                <span className="text-sm font-bold text-primary-default">2</span>
              </div>
              <h4 className="text-sm font-medium text-foreground-primary mb-1">Allocation</h4>
              <p className="text-sm text-foreground-secondary">Receive a gathering allocation based on the amount of $BFD staked and the duration of the staking period.</p>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary-default/20 border border-primary-default/40">
                <span className="text-sm font-bold text-primary-default">3</span>
              </div>
              <h4 className="text-sm font-medium text-foreground-primary mb-1">Unstaking Period</h4>
              <p className="text-sm text-foreground-secondary">A 7-day unstaking period is required to withdraw $BFD tokens.</p>
            </div>

            <div className="mt-4 pt-4 border-t border-border/40">
              <h4 className="text-sm font-medium text-foreground-secondary mb-2">Benefits</h4>
              <ul className="list-disc list-inside text-sm text-foreground-primary space-y-1.5">
                <li>Get gathering allocation proportional to your stake</li>
                <li>Participate in governance decisions</li>
                <li>Support the BeraFlow ecosystem</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
