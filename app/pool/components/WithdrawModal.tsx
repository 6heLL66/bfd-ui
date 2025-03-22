'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Token {
  symbol: string;
  logo: string;
  amount: string;
  value: string;
}

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: Token[];
  poolName: string;
  lpTokens: string;
  lpTokensValue: string;
}

export const WithdrawModal = ({ isOpen, onClose, tokens, poolName, lpTokens, lpTokensValue }: WithdrawModalProps) => {
  const [withdrawPercentage, setWithdrawPercentage] = useState<number>(0);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('0');
  const [slippage, setSlippage] = useState<string>("0.5");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Reset state when modal is opened
  useEffect(() => {
    if (isOpen) {
      setWithdrawPercentage(0);
      setWithdrawAmount('0');
      setSlippage("0.5");
    }
  }, [isOpen]);

  // Calculate withdraw amount when percentage changes
  useEffect(() => {
    if (lpTokens) {
      const maxAmount = parseFloat(lpTokens.replace(/,/g, ''));
      const amount = (maxAmount * withdrawPercentage / 100).toFixed(4);
      setWithdrawAmount(amount);
    }
  }, [withdrawPercentage, lpTokens]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawPercentage(Number(e.target.value));
  };

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimals
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      if (lpTokens) {
        const maxAmount = parseFloat(lpTokens.replace(/,/g, ''));
        if (value === '') {
          setWithdrawAmount('');
          setWithdrawPercentage(0);
        } else {
          const numValue = parseFloat(value);
          if (!isNaN(numValue)) {
            // Cap at maximum amount
            const cappedValue = Math.min(numValue, maxAmount);
            setWithdrawAmount(cappedValue.toString());
            setWithdrawPercentage((cappedValue / maxAmount) * 100);
          }
        }
      }
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      // Simulate withdraw transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Close modal and reset state on success
      onClose();
    } catch (error) {
      console.error('Withdraw failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate token amounts based on percentage
  const getTokenWithdrawAmount = (token: Token) => {
    const tokenAmount = parseFloat(token.amount.replace(/,/g, ''));
    return ((tokenAmount * withdrawPercentage) / 100).toFixed(6);
  };

  // Calculate token values based on percentage
  const getTokenWithdrawValue = (token: Token) => {
    const tokenValue = parseFloat(token.value.replace(/[$,]/g, ''));
    return '$' + ((tokenValue * withdrawPercentage) / 100).toFixed(2);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Withdraw from {poolName}</h3>
                <button 
                  className="p-1 rounded-full hover:bg-surface/30"
                  onClick={onClose}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              
              {/* Withdraw Form */}
              <div className="space-y-6">
                {/* LP Tokens Section */}
                <div className="bg-surface/50 rounded-lg p-4 border border-border/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground-secondary">Your LP Tokens</span>
                    <span className="font-medium">{lpTokens}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-foreground-secondary">Value</span>
                    <span className="font-medium">{lpTokensValue}</span>
                  </div>
                  
                  {/* Percentage Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Amount to withdraw</span>
                      <span className="text-sm font-medium">{withdrawPercentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={withdrawPercentage}
                      onChange={handleSliderChange}
                      className="w-full accent-primary-default cursor-pointer"
                    />
                    <div className="flex justify-between">
                      <span className="text-xs text-foreground-secondary">0%</span>
                      <div className="flex space-x-2">
                        {[25, 50, 75, 100].map((percentage) => (
                          <button
                            key={percentage}
                            className="px-2 py-1 text-xs bg-surface/30 hover:bg-primary-default/20 text-foreground-secondary rounded"
                            onClick={() => setWithdrawPercentage(percentage)}
                          >
                            {percentage}%
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-foreground-secondary">100%</span>
                    </div>
                  </div>
                  
                  {/* LP Token Amount Input */}
                  <div className="mt-4">
                    <div className="flex items-center mt-2 bg-surface/30 rounded-lg border border-border/20 p-2">
                      <input
                        type="text"
                        value={withdrawAmount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent border-none focus:outline-none text-lg"
                      />
                      <span className="text-sm text-foreground-secondary">LP Tokens</span>
                    </div>
                  </div>
                </div>
                
                {/* Will Receive */}
                <div className="bg-surface/50 rounded-lg p-4 border border-border/30">
                  <div className="text-sm font-medium mb-3">You will receive</div>
                  
                  <div className="space-y-3">
                    {tokens.map((token) => (
                      <div key={token.symbol} className="flex justify-between items-center p-2 rounded-lg border border-border/20 bg-surface/30">
                        <div className="flex items-center gap-2">
                          <Image 
                            src={token.logo} 
                            alt={token.symbol} 
                            width={20} 
                            height={20} 
                            className="rounded-full"
                          />
                          <div>
                            <div className="text-sm font-medium">{token.symbol}</div>
                            <div className="text-xs text-foreground-secondary">{getTokenWithdrawAmount(token)}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{getTokenWithdrawValue(token)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Slippage Setting */}
                <div className="bg-surface/50 rounded-lg p-4 border border-border/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground-secondary">Slippage Tolerance</span>
                    <div className="flex items-center gap-1">
                      {["0.1", "0.5", "1.0"].map((value) => (
                        <button
                          key={value}
                          className={`px-2 py-1 text-xs rounded ${
                            slippage === value 
                              ? 'bg-primary-default text-white' 
                              : 'bg-surface/30 text-foreground-secondary hover:bg-primary-default/20'
                          }`}
                          onClick={() => setSlippage(value)}
                        >
                          {value}%
                        </button>
                      ))}
                      <div className="relative ml-1">
                        <input
                          type="text"
                          value={slippage}
                          onChange={(e) => {
                            if (/^[0-9]*\.?[0-9]*$/.test(e.target.value) || e.target.value === '') {
                              setSlippage(e.target.value);
                            }
                          }}
                          className="w-14 px-2 py-1 text-xs bg-surface/30 border border-border/20 rounded focus:outline-none focus:border-primary-default/40"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-foreground-secondary">
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <button
                  className={`w-full px-4 py-3 rounded-lg font-medium ${
                    isLoading || withdrawPercentage <= 0
                      ? 'bg-primary-default/50 cursor-not-allowed'
                      : 'bg-primary-default hover:bg-primary-hover'
                  } text-white transition-colors`}
                  onClick={handleWithdraw}
                  disabled={isLoading || withdrawPercentage <= 0}
                >
                  {isLoading ? 'Processing...' : 'Withdraw'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 