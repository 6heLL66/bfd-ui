'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LightningBoltIcon } from '@radix-ui/react-icons';
import { createPortal } from 'react-dom';
import { Button } from '@heroui/button';
import { TokenAmount } from '@berachain-foundation/berancer-sdk';
import { bgtToken } from '@/config/berachain';

interface RemoveBoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBGT?: TokenAmount;
  onQueueDropBoost: (amount: bigint) => Promise<void>;
}

export const RemoveBoostModal = ({ 
  isOpen, 
  onClose, 
  availableBGT,
  onQueueDropBoost
}: RemoveBoostModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [removeBoostAmount, setRemoveBoostAmount] = useState('');
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, availableBGT]);

  const handleSetMaxAmount = () => {
    const maxAmount = availableBGT;
    setRemoveBoostAmount(maxAmount?.toSignificant(18) ?? '');
  };

  const handleConfirm = async () => {
    const amount = TokenAmount.fromHumanAmount(bgtToken, removeBoostAmount as `${number}`);
    await onQueueDropBoost(amount.amount);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close the modal when clicking the overlay/backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isError = +removeBoostAmount > Number(availableBGT);
  
  if (!isOpen) return null;
  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={handleOverlayClick}
          >
            <div className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                 onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="bg-primary-default/20 rounded-full p-1.5 mr-2">
                    <LightningBoltIcon className="w-4 h-4 text-primary-default" />
                  </div>
                  <h3 className="text-xl font-bold">Remove Boost</h3>
                </div>
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
              
              {/* Animated Boost Icon/Image */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-primary-default/20 rounded-full blur-xl transform scale-90"></div>
                  <div className="bg-gradient-to-br from-primary-default to-primary-hover rounded-full p-6 relative">
                    <LightningBoltIcon className="w-12 h-12 text-black" />
                  </div>
                  <motion.div 
                    className="absolute -inset-1 bg-primary-default/30 rounded-full z-[-1]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Available BGT Display - Simplified */}
              <div className="mb-4 flex justify-between items-center bg-primary-default/10 rounded-lg px-4 py-3 border border-primary-default/20">
                <span className="text-sm font-medium text-foreground-secondary">Current Boost</span>
                <span className="text-lg font-semibold">
                  <span className="text-foreground-primary">{availableBGT?.toSignificant()}</span>
                  <span className="text-primary-default ml-1">BGT</span>
                </span>
              </div>
              
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground-secondary mb-2 block">
                  Remove Amount
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={removeBoostAmount} 
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setRemoveBoostAmount(value);
                    }}
                    className={`w-full px-4 py-3.5 bg-surface/70 border-2 ${isError ? 'border-red-500/60' : 'border-primary-default/30'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-default/50 focus:border-primary-default/60 pr-20 text-xl font-medium transition-all duration-200 shadow-sm placeholder:text-foreground-secondary/50`}
                    placeholder="0.00"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-foreground-secondary text-sm mr-1">BGT</span>
                    <button
                      onClick={handleSetMaxAmount}
                      className="bg-primary-default/20 hover:bg-primary-default/30 text-primary-default font-medium text-xs px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      MAX
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Single action button */}
              <Button 
                onPress={handleConfirm}
                isDisabled={isError || removeBoostAmount === '0'}
                size='lg'
                className='w-full bg-primary-default text-black hover:bg-primary-hover font-bold text-md'
              >
                <span>Queue Removal</span>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
  
  // Use createPortal to render the modal at the root level
  return createPortal(modalContent, document.body);
}; 