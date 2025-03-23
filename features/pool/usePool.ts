import { getPool, getPoolHistoricalData } from '@/shared/api/berachain';
import { weightedPoolAbi_V3, TokenAmount, AddLiquidityQueryOutput, Slippage, RemoveLiquidityQueryOutput, AddLiquidity, RemoveLiquidity } from '@berachain-foundation/berancer-sdk';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect} from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { balancerApi, beraHoneyLpToken } from '@/config/berachain';
import { waitForTransactionReceipt, sendTransaction } from 'wagmi/actions';
import { wagmiConfig } from '@/config/wagmi';
import { useSwapSettings } from '../swap/store/swapSettings';
import { useTokens } from '@/shared/hooks/useTokens';
import { Pool } from '@/shared/api/types';

export const usePool = (id: string) => {
  const { address } = useAccount();
  const { slippage } = useSwapSettings();

  const { tokens, fetchTokens } = useTokens();

  const { data: pool, refetch: refetchPool } = useQuery<any, unknown, Pool>({
    queryKey: ['pool', id],
    queryFn: async () => {
        const pool = await getPool(id);
        return pool;
    },
  });

  useEffect(() => {
    if (address) {
        fetchTokens(pool?.tokens.map((token) => token.address) ?? [], address as `0x${string}`);
    }
    
  }, [pool?.tokens, address]);

  const { data: poolState, refetch: refetchPoolState } = useQuery({
    queryKey: ['pool-state', id],
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
    }, 10000);

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

  const lpTokens = TokenAmount.fromRawAmount(beraHoneyLpToken, lpAmount ?? 0);
  const totalLp = TokenAmount.fromRawAmount(beraHoneyLpToken, totalSupply ?? 0);
  const k = lpTokens.amount && totalLp.amount ? lpTokens.divUpFixed(totalLp.amount) : TokenAmount.fromRawAmount(beraHoneyLpToken, 1);

  return { poolState, pool, tokens, lpTokens, lpVaultAddress, k, historicalData, deposit, withdraw, refetchAll };
};
