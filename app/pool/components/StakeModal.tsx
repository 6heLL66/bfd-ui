import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/button';
import { useVaultStacking } from '@/features/stacking/useVaultStacking';
import { POOL_ID, VAULT_CA } from '@/config/berachain';
import { TokenAmount } from '@berachain-foundation/berancer-sdk';
import { useApprove } from '@/shared/hooks/useApprove';
import { createApproveToast } from '@/app/swap/toasts';
import { usePool } from '@/features/pool/usePool';
import { createStakeToast } from './toasts';

type StakeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const StakeModal = ({ isOpen, onClose }: StakeModalProps) => {
  const { checkAllowance, approve } = useApprove();
  const { vault, stake } = useVaultStacking(VAULT_CA);
  const { lpTokens, lpToken, refetchAll } = usePool(POOL_ID);
  const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState(0);
  const availableLP = lpTokens?.toSignificant();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleStake = async () => {
    const stakeAmount = TokenAmount.fromHumanAmount(lpToken, amount as `${number}`);
    const needAllowance = await checkAllowance(VAULT_CA, stakeAmount.amount, lpToken);

    if (needAllowance) {
      const promise = approve(VAULT_CA, stakeAmount.amount, lpToken) as Promise<void>;

      createApproveToast(promise, lpToken.symbol ?? '', stakeAmount.toSignificant(), false, 'stake');

      await promise;
    }

    const promise = stake(stakeAmount.amount);

    createStakeToast(promise, stakeAmount.toSignificant());

    await promise;

    refetchAll();
    onClose();
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPercentage(value);
    
    if (availableLP && value > 0) {
      try {
        const calculatedAmount = (+availableLP * value) / 100;
        const formattedAmount = calculatedAmount.toFixed(6);
        setAmount(formattedAmount);
      } catch (error) {
        console.error("Error calculating amount:", error);
      }
    } else if (value === 0) {
      setAmount('');
    }
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    
    if (availableLP && newAmount && !isNaN(Number(newAmount))) {
      const amountValue = Number(newAmount);
      if (+availableLP > 0) {
        const newPercentage = Math.min(Math.round((amountValue / +availableLP) * 100), 100);
        setPercentage(newPercentage);
      }
    } else if (newAmount === '') {
      setPercentage(0);
    }
  };

  const handleSetPercentage = (percent: number) => {
    setPercentage(percent);
    
    if (availableLP && percent > 0) {
      try {
        const calculatedAmount = (+availableLP * percent) / 100;
        const formattedAmount = calculatedAmount.toFixed(6);
        setAmount(formattedAmount);
      } catch (error) {
        console.error("Error calculating amount:", error);
      }
    } else if (percent === 0) {
      setAmount('');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  const percentageButtons = [25, 50, 75, 100];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 500, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div 
              ref={modalRef}
              className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full max-w-md mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-5">
                <h2 className="text-lg font-semibold">Stake LP Tokens</h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
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
              
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-foreground-secondary">Amount</label>
                  <div className="text-xs text-foreground-secondary flex items-center gap-2">
                    <span>{percentage}%</span>
                    <span>APR: <span className="text-primary-default">{(Number(vault?.dynamicData.apr) * 100).toFixed(2)}%</span></span>
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0.0"
                    className="w-full px-4 py-3 bg-surface/50 border border-border/40 rounded-lg focus:outline-none focus:border-primary-default/50 text-foreground-primary transition-colors"
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-surface/80 border border-border/40 rounded text-foreground-secondary hover:border-primary-default/40 transition-colors"
                    onClick={() => handleSetPercentage(100)}
                  >
                    MAX
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="relative h-2 mb-4">
                  <div className="absolute inset-0 rounded-full bg-surface/80 border border-border/40"></div>
                  
                  <div 
                    className="absolute h-full rounded-full bg-primary-default"
                    style={{ width: `${percentage}%` }}
                  ></div>
                  
                  <div 
                    className="absolute top-1/2 h-4 w-4 bg-white rounded-full shadow-md border border-border/40 cursor-pointer transform -translate-y-1/2 hover:scale-110 hover:border-primary-default active:scale-95"
                    style={{ left: `calc(${percentage}% - 8px)` }}
                  ></div>
                  
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={percentage} 
                    onChange={handleSliderChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full z-10"
                  />
                </div>
                
                <div className="flex justify-between mt-3 gap-2">
                  {percentageButtons.map((percent) => (
                    <button
                      key={percent}
                      onClick={() => handleSetPercentage(percent)}
                      className={`flex-1 py-1 text-xs rounded font-medium transition-colors ${
                        percentage === percent 
                          ? 'bg-primary-default text-white' 
                          : 'bg-surface/80 border border-border/40 text-foreground-secondary hover:border-primary-default/40'
                      }`}
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between px-2 mb-6 text-sm text-foreground-secondary">
                <span>Available:</span>
                <span>{Number(availableLP).toFixed(4)} LP</span>
              </div>
              
              <Button 
                className="w-full px-4 py-2.5 bg-primary-default hover:bg-primary-hover text-white font-medium rounded-lg transition-colors"
                onPress={handleStake}
                disabled={!amount || Number(amount) <= 0}
              >
                Stake LP Tokens
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 