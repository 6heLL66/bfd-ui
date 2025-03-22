'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { PoolCharts } from './PoolCharts';
import { EarnApy } from './EarnApy';
import { DepositModal } from './DepositModal';
import { WithdrawModal } from './WithdrawModal';

export const PoolClient = () => {
  // Mock data for UI development
  const { isConnected } = useAccount();
  
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const [hasDeposits] = useState(true);
  
  const poolData = {
    name: 'WBERA | HONEY',
    type: 'Weighted',
    fee: '0.30%',
    contract: '0x2c...c354',
    apy: '94.03%',
    tvl: '$94.60M',
    volume24h: '$5.37M',
    fees24h: '$16.12K',
    poolAPR: '3.11%',
    tokens: [
      {
        symbol: 'WBERA',
        weight: '50%',
        amount: '7.83M',
        value: '$47.25M',
        logo: 'https://berascan.com/token/images/wrappedbera_ofc_64.png',
        balance: '12.56',
        price: 604.25
      },
      {
        symbol: 'HONEY',
        weight: '50%',
        amount: '47.34M',
        value: '$47.31M',
        logo: 'https://berascan.com/token/images/honeybera_32.png',
        balance: '23,578.91',
        price: 1.0
      }
    ],
    rewardVault: {
      address: '0xc2...872c',
      whitelisted: false
    },
    userPosition: {
      lpTokens: '1,526.48',
      share: '0.02%',
      value: '$18,750.63',
      tokens: [
        {
          symbol: 'WBERA',
          amount: '1.56',
          value: '$9,376.32',
          logo: '/images/logo.jpg'
        },
        {
          symbol: 'HONEY',
          amount: '9,374.28',
          value: '$9,374.31',
          logo: '/images/--1.png'
        }
      ]
    }
  };

  // Open deposit modal
  const handleOpenDepositModal = () => {
    setIsDepositModalOpen(true);
  };

  // Close deposit modal
  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
  };

  // Open withdraw modal
  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  // Close withdraw modal
  const handleCloseWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="container mx-auto px-4 py-12 max-w-7xl"
    >
      {/* Modals */}
      <DepositModal 
        isOpen={isDepositModalOpen} 
        onClose={handleCloseDepositModal} 
        tokens={poolData.tokens} 
        poolName={poolData.name}
      />
      
      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={handleCloseWithdrawModal} 
        tokens={poolData.userPosition.tokens} 
        poolName={poolData.name}
        lpTokens={poolData.userPosition.lpTokens}
        lpTokensValue={poolData.userPosition.value}
      />

      {/* Pool Header */}
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
            <h1 className="text-xl md:text-h3 font-bold">{poolData.name}</h1>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="px-2 py-0.5 bg-primary-default/10 text-primary-default text-xs rounded-full">
                {poolData.type}
              </span>
              <span className="px-2 py-0.5 bg-surface text-foreground-secondary text-xs rounded-full border border-border/40">
                Fee: {poolData.fee}
              </span>
              <Link 
                href={`https://berascan.com/address/${poolData.contract}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 bg-surface text-foreground-secondary text-xs rounded-full border border-border/40 hover:border-primary-default/40 transition-colors"
              >
                Pool Contract: {poolData.contract}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          {!isConnected && (
            <button className="px-4 py-2 bg-primary-default hover:bg-primary-hover text-white font-medium rounded-lg transition-colors">
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats & Deposits */}
        <div className="lg:col-span-1 space-y-8">
          {/* My Deposits Card */}
          <motion.div
            className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300"
          >
            <h2 className="text-lg font-semibold border-b border-border/40 pb-3 mb-4">My deposits</h2>
            
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="text-foreground-secondary text-sm mb-4">Connect your wallet to view your deposits</span>
                <button className="px-4 py-2 bg-primary-default hover:bg-primary-hover text-white font-medium rounded-lg transition-colors">
                  Connect Wallet
                </button>
              </div>
            ) : !hasDeposits ? (
              <div className="flex flex-col items-center justify-center py-8">
                <span className="text-foreground-secondary text-sm mb-6">You have no current deposits in this pool</span>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button 
                    className="w-full px-4 py-2 bg-primary-default hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                    onClick={handleOpenDepositModal}
                  >
                    Deposit
                  </button>
                  <button 
                    className="w-full px-4 py-2 border border-border/40 hover:border-primary-default/40 text-foreground-primary font-medium rounded-lg transition-colors"
                    onClick={handleOpenWithdrawModal}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Position Overview */}
                <div className="bg-surface/50 rounded-lg p-3 border border-border/30">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-foreground-primary text-sm font-medium">Your position</span>
                    <span className="px-2 py-0.5 bg-primary-default/10 text-primary-default text-xs rounded-full">
                      Share: {poolData.userPosition.share}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <div className="text-foreground-secondary text-xs mb-1">LP Tokens</div>
                      <div className="text-foreground-primary font-medium">{poolData.userPosition.lpTokens}</div>
                    </div>
                    <div>
                      <div className="text-foreground-secondary text-xs mb-1">Value</div>
                      <div className="text-foreground-primary font-medium">{poolData.userPosition.value}</div>
                    </div>
                  </div>
                  
                  {/* Position Tokens */}
                  <div className="space-y-2">
                    {poolData.userPosition.tokens.map((token, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg border border-border/20 bg-surface/30">
                        <div className="flex items-center gap-2">
                          <Image 
                            src={token.logo} 
                            alt={token.symbol} 
                            width={20} 
                            height={20} 
                            className="rounded-full"
                          />
                          <div>
                            <div className="text-foreground-primary text-sm font-medium">{token.symbol}</div>
                            <div className="text-foreground-secondary text-xs">{token.amount}</div>
                          </div>
                        </div>
                        <div className="text-foreground-primary text-sm font-medium">{token.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <button 
                    className="w-full px-4 py-2 bg-primary-default hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                    onClick={handleOpenDepositModal}
                  >
                    Deposit
                  </button>
                  <button 
                    className="w-full px-4 py-2 border border-border/40 hover:border-primary-default/40 text-foreground-primary font-medium rounded-lg transition-colors"
                    onClick={handleOpenWithdrawModal}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          <EarnApy />
        </div>

        {/* Right Column - Pool Data */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pool Metrics */}
          <motion.div
            className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <span className="text-foreground-secondary text-sm">TVL</span>
                <span className="text-foreground-primary text-xl font-semibold">{poolData.tvl}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground-secondary text-sm">Volume (24h)</span>
                <span className="text-foreground-primary text-xl font-semibold">{poolData.volume24h}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground-secondary text-sm">Fees (24h)</span>
                <span className="text-foreground-primary text-xl font-semibold">{poolData.fees24h}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground-secondary text-sm">Pool APR</span>
                <span className="text-foreground-primary text-xl font-semibold">{poolData.poolAPR}</span>
              </div>
            </div>
          </motion.div>

          {/* Pool Charts - New component */}
          <PoolCharts />

          {/* Pool Liquidity */}
          <motion.div
            className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300"
          >
            <h2 className="text-lg font-semibold mb-4">Pool Liquidity</h2>
            
            <div className="space-y-4">
              {poolData.tokens.map((token, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-border/40 hover:border-primary-default/30 transition-all">
                  <div className="flex items-center gap-3">
                    <Image 
                      src={token.logo} 
                      alt={token.symbol} 
                      width={36} 
                      height={36} 
                      className="rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground-primary font-medium">{token.symbol}</span>
                        <span className="text-xs text-foreground-secondary">{token.weight}</span>
                      </div>
                      <span className="text-xs text-foreground-secondary">{token.amount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-foreground-primary font-medium">{token.value}</span>
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