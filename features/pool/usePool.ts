import { getPool, getPoolHistoricalData } from '@/shared/api/berachain';
import { weightedPoolAbi_V3, TokenAmount, AddLiquidityQueryOutput, Slippage, RemoveLiquidityQueryOutput, AddLiquidity, RemoveLiquidity, Token } from '@berachain-foundation/berancer-sdk';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect} from 'react';
import { useReadContract, useAccount, useChainId } from 'wagmi';
import { waitForTransactionReceipt, sendTransaction } from 'wagmi/actions';
import { wagmiConfig } from '@/config/wagmi';
import { useSwapSettings } from '../swap/store/swapSettings';
import { useTokens } from '@/shared/hooks/useTokens';
import { Pool } from '@/shared/api/types';
import { useBalancer } from '@/shared/hooks/useBalancer';

export const usePool = (id: string) => {
  const { address } = useAccount();

  const balancerApi = useBalancer();
  const { slippage } = useSwapSettings();
  const chainId = useChainId();

  const { tokens, fetchTokens } = useTokens();

  const { data: pool, refetch: refetchPool } = useQuery<any, unknown, Pool>({
    queryKey: ['pool', id],
    queryFn: () => getPool(id),
  });

  const lpToken = new Token(chainId, (pool?.address ?? '') as `0x${string}`, 18, 'WBERA-HONEY-WEIGHTED');

  useEffect(() => {
    if (address) {
        fetchTokens(pool?.tokens.map((token) => token.address) ?? [], address as `0x${string}`);
    }
    
  }, [pool?.tokens, address]);

  const { data: poolState, refetch: refetchPoolState } = useQuery({
    queryKey: ['pool-state', id, balancerApi],
    queryFn: () => balancerApi.pools.fetchPoolStateWithBalances(id),
  });

  const { data: historicalData } = useQuery({
    queryKey: ['pool', 'historical', id],
    queryFn: () => getPoolHistoricalData(id),
  });

  const { data: lpAmount, refetch: refetchLpTokens } = useReadContract({
    address: poolState?.address as `0x${string}`,
    abi: weightedPoolAbi_V3,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  const { data: lpVaultAddress } = useReadContract({
    address: poolState?.address as `0x${string}`,
    abi: weightedPoolAbi_V3,
    functionName: 'getVault',
  });

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: poolState?.address as `0x${string}`,
    abi: weightedPoolAbi_V3,
    functionName: 'totalSupply',
  });
  
  const refetchAll = useCallback(() => {
    refetchPool();
    refetchLpTokens();
    refetchPoolState();
    refetchTotalSupply();
  }, [refetchLpTokens, refetchPoolState, refetchTotalSupply, refetchPool]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchAll();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetchAll]);

  const deposit = useCallback(
    async (queryOutput: AddLiquidityQueryOutput) => {
      if (!poolState || !lpVaultAddress) return;

      const _slippage = Slippage.fromPercentage(slippage as `${number}`);
      const addLiquidity = new AddLiquidity();


      const callData = addLiquidity.buildCall({
        ...queryOutput,
        sender: address as `0x${string}`,
        recipient: address as `0x${string}`,
        wethIsEth: false,
        slippage: _slippage,
      });

      const tx = await sendTransaction(wagmiConfig, {
        to: callData.to,
        data: callData.callData,
        value: callData.value,
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: tx });

      refetchAll();
    },
    [lpVaultAddress, poolState]
  );

  const withdraw = useCallback(
    async (queryOutput: RemoveLiquidityQueryOutput) => {
      if (!poolState || !lpVaultAddress) return;

      const _slippage = Slippage.fromPercentage(slippage as `${number}`);
      const removeLiquidity = new RemoveLiquidity();

      const callData = removeLiquidity.buildCall({
        ...queryOutput,
        sender: address as `0x${string}`,
        recipient: address as `0x${string}`,
        wethIsEth: false,
        slippage: _slippage,
      });

      const tx = await sendTransaction(wagmiConfig, {
        to: callData.to,
        data: callData.callData,
        value: callData.value,
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: tx });

      refetchAll();
    },
    [lpVaultAddress, poolState, slippage, address]
  );

  const lpTokens = TokenAmount.fromRawAmount(lpToken, lpAmount ?? 0);
  const totalLp = TokenAmount.fromRawAmount(lpToken, totalSupply ?? 0);
  const k = lpTokens.amount && totalLp.amount ? lpTokens.divUpFixed(totalLp.amount) : TokenAmount.fromRawAmount(lpToken, 1);

  const liquidityTokens = tokens.filter((token) => pool?.tokens.some((t) => t.address === token.token.address));

  return { poolState, pool, tokens: liquidityTokens, lpTokens, lpVaultAddress, k, historicalData, lpToken, deposit, withdraw, refetchAll };
};
