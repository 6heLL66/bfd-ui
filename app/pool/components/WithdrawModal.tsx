'use client'

import { useCallback, useState } from 'react';
import { debounce, upperFirst } from 'lodash';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePool } from '@/features/pool/usePool';
import { beraHoneyLpToken, CHAIN_ID, POOL_CA, RPC_URL } from '@/config/berachain';
import { RemoveLiquidity, RemoveLiquidityKind, RemoveLiquidityProportionalInput, RemoveLiquidityQueryOutput, Token, TokenAmount } from '@berachain-foundation/berancer-sdk';
import { useSwapSettings } from '@/features/swap/store/swapSettings';
import { formatCurrency } from '@/app/treasury/components/TokenDistributionChart';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  lpTokensValue: string;
}

export const WithdrawModal = ({ isOpen, onClose, lpTokensValue }: WithdrawModalProps) => {
  const { pool, poolState, withdraw, lpTokens, tokens } = usePool(POOL_CA);
  const [withdrawPercentage, setWithdrawPercentage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [queryOutput, setQueryOutput] = useState<RemoveLiquidityQueryOutput | null>(null);
  const [amountsOut, setAmountsOut] = useState<TokenAmount[]>();

  const { slippage, setSlippage } = useSwapSettings();

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawPercentage(Number(e.target.value));

    debouncedQueryLiquidity(beraHoneyLpToken, TokenAmount.fromHumanAmount(beraHoneyLpToken, String((Number(e.target.value) / 100) * Number(lpTokens.toSignificant())) as `${number}`))
  };

  const queryLiquidity = useCallback(async (token: Token, tokenAmount: TokenAmount) => {
    if (!poolState) return;

    const removeLiquidity = new RemoveLiquidity();

    const removeLiquidityInput = {
      chainId: CHAIN_ID,
      kind: RemoveLiquidityKind.Proportional,
      rpcUrl: RPC_URL,
      bptIn: {
          address: poolState.address as `0x${string}`,
          decimals: token.decimals,
          rawAmount: tokenAmount.amount
      },
    } as RemoveLiquidityProportionalInput;

    const queryOutput = await removeLiquidity.query(removeLiquidityInput, {...poolState, type: upperFirst(poolState.type.toLocaleLowerCase())});

    setAmountsOut(queryOutput.amountsOut);
    setQueryOutput(queryOutput);

    return queryOutput
  }, [poolState, tokens]);

  const debouncedQueryLiquidity = useCallback(debounce(queryLiquidity, 500), [queryLiquidity]);

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      if (!pool || !pool.tokens || !queryOutput) {
        return;
      }

      const _queryOutput = await queryLiquidity(beraHoneyLpToken, TokenAmount.fromHumanAmount(beraHoneyLpToken, String((Number(withdrawPercentage) / 100) * Number(lpTokens.toSignificant())) as `${number}`))

      await withdraw(_queryOutput as RemoveLiquidityQueryOutput);

      onClose();
    } catch (error) {
      console.error('Withdraw failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
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
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Withdraw from {pool?.name}</h3>
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
              
              <div className="space-y-6">
                <div className="bg-surface/50 rounded-lg p-4 border border-border/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground-secondary">Your LP Tokens</span>
                    <span className="font-medium">{lpTokens.toSignificant()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-foreground-secondary">Value</span>
                    <span className="font-medium">{lpTokensValue}</span>
                  </div>
                  
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
                      <span className="text-xs text-foreground-secondary">100%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface/50 rounded-lg p-4 border border-border/30">
                  <div className="text-sm font-medium mb-3">You will receive</div>
                  
                  <div className="space-y-3">
                    { amountsOut && tokens.map((token, index) => {
                      const balance = amountsOut[index];
                      const balanceUSD = balance.mulUpFixed(token.price.amount).toSignificant();
                      return (
                      <div key={token.token.symbol} className="flex justify-between items-center p-2 rounded-lg border border-border/20 bg-surface/30">
                        <div className="flex items-center gap-2">
                          <Image 
                            src={token.logo}
                            alt={token.token.symbol ?? ''} 
                            width={20} 
                            height={20} 
                            className="rounded-full"
                          />
                          <div>
                            <div className="text-sm font-medium">{token.token.symbol}</div>
                            <div className="text-xs text-foreground-secondary">{balance.toSignificant(18)}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{formatCurrency(+balanceUSD, '$0.00a')}</div>
                      </div>
                    )})}
                  </div>
                </div>
                
                <div className="bg-surface/50 rounded-lg p-4 py-3 border border-border/30">
                  <div className="flex justify-between items-center">
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