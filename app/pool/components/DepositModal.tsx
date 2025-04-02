'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePool } from '@/features/pool/usePool';
import { POOL_ID } from '@/config/berachain';
import { AddLiquidityKind, TokenAmount, Token, AddLiquidityInput, AddLiquidityQueryOutput, Slippage, AddLiquidity, PoolState } from '@berachain-foundation/berancer-sdk';
import { getTokenImageUrl } from '@/shared/utils';
import { useApprove } from '@/shared/hooks/useApprove';
import { createApproveToast } from '@/app/swap/toasts';
import { useSwapSettings } from '@/features/swap/store/swapSettings';
import { debounce, upperFirst } from 'lodash';
import { FullToken } from '@/shared/hooks/useTokens';
import { Button } from '@heroui/button';
import { createDepositToast } from './toasts';
import { useConfig } from 'wagmi';
import { useChainId } from 'wagmi';
interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositModal = ({ isOpen, onClose }: DepositModalProps) => {
  const { approve, checkAllowance } = useApprove();
  const { deposit, pool, lpVaultAddress, poolState, tokens } = usePool(POOL_ID);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isQueryLoading, setIsQueryLoading] = useState<boolean>(false);

  const chainId = useChainId();
  const config = useConfig();

  console.log('config', config);

  const [queryOutput, setQueryOutput] = useState<AddLiquidityQueryOutput | null>(null);
  const { slippage, setSlippage } = useSwapSettings();

  const queryLiquidity = useCallback(
    async (token: Token, tokenAmount: TokenAmount) => {
      console.log('token', poolState);
      if (!pool) return;
      setIsQueryLoading(true);

      const addLiquidity = new AddLiquidity();

      const addLiquidityInput = {
        chainId,
        kind: AddLiquidityKind.Proportional,
        rpcUrl: config.chains[0].rpcUrls.default.http[0],
        referenceAmount: {
          address: token.address as `0x${string}`,
          decimals: token.decimals,
          rawAmount: tokenAmount.amount,
        },
      } as AddLiquidityInput;

      const queryOutput = await addLiquidity.query(addLiquidityInput, { ...(pool as PoolState), type: upperFirst(pool.type.toLocaleLowerCase()) });
      const otherToken = tokens.filter(_token => _token.token.symbol !== token.symbol)[0];
      const otherTokenIndex = tokens.indexOf(otherToken);

      setAmounts(prev => ({
        ...prev,
        [otherToken.token.symbol ?? '']: queryOutput.amountsIn[otherTokenIndex].toSignificant(18),
      }));

      setQueryOutput(queryOutput);
      setIsQueryLoading(false);

      return queryOutput;
    },
    [pool, tokens, chainId, config]
  );

  const debouncedQueryLiquidity = useCallback(debounce(queryLiquidity, 300), [queryLiquidity]);

  const handleAmountChange = (symbol: string, value: string) => {
    const token = tokens.find(token => token.token.symbol === symbol)!;

    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setAmounts(prev => ({
        ...prev,
        [symbol]: value,
      }));
    }
    debouncedQueryLiquidity(token.token, TokenAmount.fromHumanAmount(token.token, value as `${number}`));
  };

  const handleMaxButtonClick = (token: FullToken) => {
    const _slippage = Slippage.fromPercentage(slippage as `${number}`);
    const maxAmount = TokenAmount.fromRawAmount(token.token, _slippage.applyTo(token.balance.amount, -1)).toSignificant(18);
    setAmounts(prev => ({
      ...prev,
      [token.token.symbol ?? '']: maxAmount,
    }));

    handleAmountChange(token.token.symbol ?? '', maxAmount);
  };

  const handleDeposit = async () => {
    try {
      if (!pool || !queryOutput) {
        return;
      }
      const _slippage = Slippage.fromPercentage(slippage as `${number}`);

      setIsLoading(true);

      const tokenAmountsApproval = tokens.map(token => {
        return _slippage.applyTo(TokenAmount.fromHumanAmount(token.token, amounts[token.token.symbol ?? ''] as `${number}`).amount);
      });

      const token1 = tokens[0].token;
      const token2 = tokens[1].token;

      const needApprove1 = await checkAllowance(lpVaultAddress as `0x${string}`, tokenAmountsApproval[0], token1);

      if (needApprove1) {
        const promise = approve(lpVaultAddress as `0x${string}`, tokenAmountsApproval[0], token1) as Promise<void>;

        createApproveToast(promise, token1.symbol ?? '', amounts[token1.symbol!] as `${number}`, false, 'deposit');

        await promise.catch(() => {
          setIsLoading(false);

          throw new Error('Failed to approve');
        });
      }

      const needApprove2 = await checkAllowance(lpVaultAddress as `0x${string}`, tokenAmountsApproval[1], token2);

      if (needApprove2) {
        const promise = approve(lpVaultAddress as `0x${string}`, tokenAmountsApproval[1], token2) as Promise<void>;

        createApproveToast(promise, token2.symbol ?? '', amounts[token2.symbol!] as `${number}`, false, 'deposit');

        await promise.catch(() => {
          setIsLoading(false);

          throw new Error('Failed to approve');
        });
      }

      const _queryOutput = await queryLiquidity(token1, TokenAmount.fromHumanAmount(token1, amounts[token1.symbol!] as `${number}`));

      const promise = deposit(_queryOutput as AddLiquidityQueryOutput);

      createDepositToast(promise, token1.symbol ?? '', amounts[token1.symbol!] as `${number}`, token2.symbol ?? '', amounts[token2.symbol!] as `${number}`);

      await promise;
      onClose();
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const _slippage = Slippage.fromPercentage(slippage as `${number}`);

  const isError = (index: number) =>
    TokenAmount.fromRawAmount(tokens[index]?.token, _slippage.applyTo(tokens[index]?.balance.amount ?? 0, -1)).amount <
    TokenAmount.fromHumanAmount(tokens[index]?.token, (amounts[tokens[index]?.token.symbol ?? ''] ?? '0') as `${number}`).amount;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Deposit to {pool?.name}</h3>
                <button className="p-1 rounded-full hover:bg-surface/30" onClick={onClose}>
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

              <div className="space-y-4">
                {tokens?.map((token, index) => (
                  <div key={token.token.symbol} className="bg-surface/50 rounded-lg p-4 border border-border/30">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Image src={getTokenImageUrl(token.token)} alt={token.token.symbol ?? ''} width={24} height={24} className="rounded-full" />
                        <span className="font-medium">{token.token.symbol}</span>
                      </div>
                      <div className="text-sm text-foreground-secondary">Balance: {token.balance.toSignificant(2)}</div>
                    </div>

                    <div className="flex items-center mt-2 bg-surface/30 rounded-lg border border-border/20 p-2">
                      <input
                        type="text"
                        value={amounts[token.token.symbol ?? ''] || ''}
                        onChange={e => handleAmountChange(token.token.symbol ?? '', e.target.value)}
                        placeholder="0.00"
                        className={`w-full bg-transparent border-none focus:outline-none text-lg ${isError(index) && 'text-red-400'}`}
                      />
                      <button
                        className="text-xs bg-primary-default/20 hover:bg-primary-default/30 text-primary-default px-2 py-1 rounded-md transition-colors"
                        onClick={() => handleMaxButtonClick(token)}
                      >
                        MAX
                      </button>
                    </div>
                  </div>
                ))}

                <div className="bg-surface/50 rounded-lg p-4 py-3 border border-border/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground-secondary">Slippage Tolerance</span>
                    <div className="flex items-center gap-1">
                      {['0.1', '0.5', '1.0'].map(value => (
                        <button
                          key={value}
                          className={`px-2 py-1 text-xs rounded ${
                            slippage === value ? 'bg-primary-default text-white' : 'bg-surface/30 text-foreground-secondary hover:bg-primary-default/20'
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
                          onChange={e => {
                            if (/^[0-9]*\.?[0-9]*$/.test(e.target.value) || e.target.value === '') {
                              setSlippage(e.target.value);
                            }
                          }}
                          className="w-14 px-2 py-1 text-xs bg-surface/30 border border-border/20 rounded focus:outline-none focus:border-primary-default/40"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-foreground-secondary">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className={`w-full px-4 py-3 rounded-lg font-medium border-none font-bold text-white bg-primary-default hover:bg-primary-hover transition-colors`}
                  onPress={handleDeposit}
                  size='lg'
                  isLoading={isLoading || isQueryLoading}
                  isDisabled={isError(0) || isError(1)}
                >
                  {isLoading ? 'Processing...' : 'Deposit'}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
