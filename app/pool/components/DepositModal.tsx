'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Token {
  symbol: string;
  logo: string;
  balance?: string;
  price?: number;
}

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: Token[];
  poolName: string;
}

export const DepositModal = ({ isOpen, onClose, tokens, poolName }: DepositModalProps) => {
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [totalValue, setTotalValue] = useState<number>(0);
  const [slippage, setSlippage] = useState<string>("0.5");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Reset state when modal is opened
  useEffect(() => {
    if (isOpen) {
      const initialAmounts: Record<string, string> = {};
      tokens.forEach(token => {
        initialAmounts[token.symbol] = '';
      });
      setAmounts(initialAmounts);
      setTotalValue(0);
      setSlippage("0.5");
    }
  }, [isOpen, tokens]);

  // Calculate total value when amounts change
  useEffect(() => {
    let total = 0;
    tokens.forEach(token => {
      const amount = parseFloat(amounts[token.symbol] || '0');
      const price = token.price || 0;
      total += amount * price;
    });
    setTotalValue(total);
  }, [amounts, tokens]);

  const handleAmountChange = (symbol: string, value: string) => {
    // Only allow numbers and decimals
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setAmounts(prev => ({
        ...prev,
        [symbol]: value
      }));
    }
  };

  const handleMaxButtonClick = (symbol: string, maxAmount: string) => {
    setAmounts(prev => ({
      ...prev,
      [symbol]: maxAmount
    }));
  };

  const handleDeposit = async () => {
    try {
      setIsLoading(true);
      // Simulate deposit transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Close modal and reset state on success
      onClose();
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsLoading(false);
    }
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
                <h3 className="text-xl font-bold">Deposit to {poolName}</h3>
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
              
              {/* Deposit Form */}
              <div className="space-y-4">
                {tokens.map((token) => (
                  <div key={token.symbol} className="bg-surface/50 rounded-lg p-4 border border-border/30">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Image 
                          src={token.logo} 
                          alt={token.symbol} 
                          width={24} 
                          height={24} 
                          className="rounded-full"
                        />
                        <span className="font-medium">{token.symbol}</span>
                      </div>
                      <div className="text-sm text-foreground-secondary">
                        Balance: {token.balance || '0.00'}
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-2 bg-surface/30 rounded-lg border border-border/20 p-2">
                      <input
                        type="text"
                        value={amounts[token.symbol] || ''}
                        onChange={(e) => handleAmountChange(token.symbol, e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent border-none focus:outline-none text-lg"
                      />
                      <button 
                        className="text-xs bg-primary-default/20 hover:bg-primary-default/30 text-primary-default px-2 py-1 rounded-md transition-colors"
                        onClick={() => handleMaxButtonClick(token.symbol, token.balance || '0')}
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                ))}
                
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
                
                {/* Summary */}
                <div className="bg-surface/50 rounded-lg p-4 border border-border/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Total Value</span>
                    <span className="font-medium">${totalValue.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground-secondary">Estimated LP Tokens</span>
                    <span className="text-sm">
                      {totalValue > 0 ? (totalValue / 10).toFixed(4) : '0.0000'}
                    </span>
                  </div>
                </div>
                
                {/* Action Button */}
                <button
                  className={`w-full px-4 py-3 rounded-lg font-medium ${
                    isLoading || totalValue <= 0
                      ? 'bg-primary-default/50 cursor-not-allowed'
                      : 'bg-primary-default hover:bg-primary-hover'
                  } text-white transition-colors`}
                  onClick={handleDeposit}
                  disabled={isLoading || totalValue <= 0}
                >
                  {isLoading ? 'Processing...' : 'Deposit'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 