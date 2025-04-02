'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAccount, useChainId } from 'wagmi';
import { PoolCharts } from './PoolCharts';
import { EarnApy } from './EarnApy';
import { DepositModal } from './DepositModal';
import { WithdrawModal } from './WithdrawModal';
import { usePool } from '@/features/pool/usePool';
import { getTokenImageUrl } from '@/shared/utils';
import { POOL_ID } from '@/config/berachain';
import { Token, TokenAmount } from '@berachain-foundation/berancer-sdk';
import { formatCurrency } from '@/app/treasury/components/TokenDistributionChart';
import { Button } from '@heroui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const PoolClient = () => {
  const { isConnected } = useAccount();
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const chainId = useChainId();
  
  const { pool, lpTokens, k, tokens, historicalData } = usePool(POOL_ID);

  const handleOpenDepositModal = () => {
    setIsDepositModalOpen(true);
  };

  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
  };

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

  const lpValue = pool?.tokens && tokens?.reduce((acc, token, index) => {
    const globalBalanceUSD = TokenAmount.fromHumanAmount(token.token, (pool.tokens[index]?.balanceUSD ?? '0')as `${number}`);
    return acc + +globalBalanceUSD.mulUpFixed(k.amount).toSignificant();
  }, 0).toFixed(2);


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="container mx-auto px-4 py-12 max-w-7xl"
    >
     {isDepositModalOpen && <DepositModal 
        isOpen={isDepositModalOpen} 
        onClose={handleCloseDepositModal} 
      />}
      
      {isWithdrawModalOpen && <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={handleCloseWithdrawModal} 
        lpTokensValue={lpValue ? formatCurrency(+lpValue, '$0.00a') : '$0'}
      />}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="relative h-12 w-12 mr-10 md:h-16 md:w-16">
              <Image 
                src="https://berascan.com/token/images/wrappedbera_ofc_64.png" 
                alt="WBERA" 
                width={64} 
                height={64} 
                className="rounded-full border-2 border-border/40 absolute"
              />
              <Image 
                src="https://berascan.com/token/images/honeybera_32.png" 
                alt="HONEY" 
                width={64} 
                height={64} 
                className="rounded-full border-2 border-border/40 absolute -right-10"
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl md:text-h3 font-bold">{pool?.name}</h1>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="px-2 py-0.5 bg-primary-default/10 text-primary-default text-xs rounded-full">
                {pool?.type}
              </span>
              <span className="px-2 py-0.5 bg-surface text-foreground-secondary text-xs rounded-full border border-border/40">
                Fee: {(Number(pool?.dynamicData?.swapFee) * 100).toFixed(2)}%
              </span>
              <Link 
                href={`https://berascan.com/address/${pool?.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 bg-surface text-foreground-secondary text-xs rounded-full border border-border/40 hover:border-primary-default/40 transition-colors"
              >
                Pool Contract: {pool?.id?.slice(0, 6)}...{pool?.id?.slice(-4)}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <motion.div
            className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300"
          >
            <h2 className="text-lg font-semibold border-b border-border/40 pb-3 mb-4">My deposits</h2>
            
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="text-foreground-secondary text-sm mb-4">Connect your wallet to view your deposits</span>
                <ConnectButton />
              </div>
            ) : +lpTokens.toSignificant() <= 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <span className="text-foreground-secondary text-sm mb-6">You have no current deposits in this pool</span>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button 
                    className="w-full px-4 py-2 bg-primary-default hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                    onPress={handleOpenDepositModal}
                  >
                    Deposit
                  </Button>
                  <Button 
                    className="w-full bg-tranparent font-bold px-4 py-2 border border-border/40 hover:border-primary-default/40 text-foreground-primary font-medium rounded-lg transition-colors"
                    onPress={handleOpenWithdrawModal}
                    isDisabled={+lpTokens.toSignificant() <= 0}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-surface/50 rounded-lg p-3 border border-border/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-foreground-primary text-sm font-medium">Your position</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-foreground-secondary text-xs mb-1">LP Tokens</div>
                      <div className="text-foreground-primary font-medium">{lpTokens.toSignificant()}</div>
                    </div>
                    <div>
                      <div className="text-foreground-secondary text-xs mb-1">Value</div>
                      <div className="text-foreground-primary font-medium">{lpValue ? formatCurrency(+lpValue, '$0.00a') : '$0'}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {pool?.tokens && tokens?.map((token, index) => {
                      const globalBalance = TokenAmount.fromHumanAmount(token.token, pool.tokens[index].balance as `${number}`);
                      const globalBalanceUSD = TokenAmount.fromHumanAmount(token.token, pool.tokens[index].balanceUSD as `${number}`);
                      return (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg border border-border/20 bg-surface/30">
                        <div className="flex items-center gap-2">
                          <Image 
                            src={token.logo} 
                            alt={token.token.symbol ?? ''} 
                            width={20} 
                            height={20} 
                            className="rounded-full"
                          />
                          <div>
                            <div className="text-foreground-primary text-sm font-medium">{token.token.symbol}</div>
                            <div className="text-foreground-secondary text-xs">{formatCurrency(+globalBalance.mulUpFixed(k.amount).toSignificant(), '0.0000a')}</div>
                          </div>
                        </div>
                        <div className="text-foreground-primary text-sm font-medium">{formatCurrency(+globalBalanceUSD.mulUpFixed(k.amount).toSignificant())}</div>
                      </div>
                    )})}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button 
                    className="w-full px-4 py-2 bg-primary-default hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                    onPress={handleOpenDepositModal}
                  >
                    Deposit
                  </Button>
                  <Button 
                    className="w-full bg-tranparent font-bold px-4 py-2 border border-border/40 hover:border-primary-default/40 text-foreground-primary font-medium rounded-lg transition-colors"
                    onPress={handleOpenWithdrawModal}
                    isDisabled={+lpTokens.toSignificant() <= 0}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          <EarnApy />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <motion.div
            className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300"
          >
            <div className="flex justify-between gap-4 px-4">
              <div className="flex flex-col">
                <span className="text-foreground-secondary text-sm">TVL</span>
                <span className="text-foreground-primary text-xl font-semibold">{formatCurrency(Number(pool?.dynamicData?.totalLiquidity))}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground-secondary text-sm">Volume (24h)</span>
                <span className="text-foreground-primary text-xl font-semibold">{formatCurrency(Number(pool?.dynamicData?.volume24h))}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground-secondary text-sm">Fees (24h)</span>
                <span className="text-foreground-primary text-xl font-semibold">{formatCurrency(Number(pool?.dynamicData?.fees24h))}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground-secondary text-sm">Pool APR</span>
                <span className="text-foreground-primary text-xl font-semibold">{(Number(pool?.dynamicData?.aprItems[0].apr) * 100).toFixed(2)}%</span>
              </div>
            </div>
          </motion.div>

          <PoolCharts historicalData={historicalData} />

          <motion.div
            className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300"
          >
            <h2 className="text-lg font-semibold mb-4">Pool Liquidity</h2>
            
            <div className="space-y-4">
              {pool?.tokens?.map((token, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-border/40 hover:border-primary-default/30 transition-all">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={getTokenImageUrl(new Token(chainId, token.address as `0x${string}`, token.decimals, token.symbol))} 
                      alt={token.symbol} 
                      width={36} 
                      height={36} 
                      className="rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground-primary font-medium">{token.symbol}</span>
                        <span className="text-xs text-foreground-secondary">{Number(token.weight) * 100}%</span>
                      </div>
                      <span className="text-xs text-foreground-secondary">{formatCurrency(+token.balance, '0.00a')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-foreground-primary font-medium">{formatCurrency(Number(token.balanceUSD))}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}; 