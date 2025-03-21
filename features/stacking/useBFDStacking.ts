import { stackingAbi } from '@/config/abi/stacking';
import { bfdToken, STACKING_CA, tokenAbi } from '@/config/berachain';
import { wagmiConfig } from '@/config/wagmi';
import { TokenAmount } from '@berachain-foundation/berancer-sdk';
import { useCallback, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';

export type UnstakeInfo = {
  unlockTime: number;
  amount: bigint;
};

export const useBFDStacking = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const { data: totalStaked, refetch: refetchTotalStaked } = useReadContract({
    address: STACKING_CA,
    abi: stackingAbi,
    functionName: 'totalStaked',
  });

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: bfdToken.address,
    abi: tokenAbi,
    functionName: 'totalSupply',
  });

  const { data: UNLOCK_PERIOD } = useReadContract({
    address: STACKING_CA,
    abi: stackingAbi,
    functionName: 'UNLOCK_PERIOD',
  });

  const { data: staked, refetch: refetchStaked } = useReadContract({
    address: STACKING_CA,
    abi: stackingAbi,
    functionName: 'stakes',
    args: [address],
  });

  const { data: unstaked, refetch: refetchUnstaked } = useReadContract({
    address: STACKING_CA,
    abi: stackingAbi,
    functionName: 'getUnstakedInfo',
    args: [address]
  });

  const { data: availableForClaim, refetch: refetchAvailableForClaim } = useReadContract({
    address: STACKING_CA,
    abi: stackingAbi,
    functionName: 'getAvailableForClaim',
    args: [address]
  });

  const refetchAll = useCallback(() => {
    refetchTotalStaked();
    refetchStaked();
    refetchUnstaked();
    refetchAvailableForClaim();
    refetchTotalSupply();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetchAll();
    }, 5000);

    return () => clearInterval(interval);
  }, [address]);

  const stake = useCallback(
    async (amount: bigint) => {
      if (!address) return;

      const tx = await writeContractAsync({
        address: STACKING_CA,
        abi: stackingAbi,
        functionName: 'stake',
        args: [amount],
      });

      await waitForTransactionReceipt(wagmiConfig, {
        hash: tx,
      });

      refetchAll();
    },
    [address, writeContractAsync, refetchAll]
  );

  const cancelUnstake = useCallback(
    async (index: number) => {
      if (!address) return;

      const tx = await writeContractAsync({
        address: STACKING_CA,
        abi: stackingAbi,
        functionName: 'cancelUnstake',
        args: [index],
      });

      await waitForTransactionReceipt(wagmiConfig, {
        hash: tx,
      });

      refetchAll();
    },
    [address, writeContractAsync, refetchAll]
  );

  const unstake = useCallback(
    async (amount: bigint) => {
      if (!address) return;

      const tx = await writeContractAsync({
        address: STACKING_CA,
        abi: stackingAbi,
        functionName: 'unstake',
        args: [amount],
      });

      await waitForTransactionReceipt(wagmiConfig, {
        hash: tx,
      });

      refetchAll();
    },
    [address, writeContractAsync, refetchAll]
  );

  const claim = useCallback(async () => {
    if (!address) return;

    const tx = await writeContractAsync({
      address: STACKING_CA,
      abi: stackingAbi,
      functionName: 'claim',
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash: tx,
    });

    refetchAll();
  }, [address, writeContractAsync, refetchAll]);

  return {
    UNLOCK_PERIOD: UNLOCK_PERIOD as number,
    totalStaked: TokenAmount.fromRawAmount(bfdToken, (totalStaked ?? 0) as bigint),
    staked: TokenAmount.fromRawAmount(bfdToken, (staked ?? 0) as bigint),
    unstaked: (unstaked as UnstakeInfo[])?.map((unstake: UnstakeInfo) => {
      return {
        unlockTime: new Date(Number(unstake.unlockTime) * 1000),
        amount: TokenAmount.fromRawAmount(bfdToken, unstake.amount),
      }
    }),
    availableForClaim: TokenAmount.fromRawAmount(bfdToken, (availableForClaim ?? 0) as bigint),
    totalSupply: TokenAmount.fromRawAmount(bfdToken, (totalSupply ?? 0) as bigint),
    stake,
    unstake,
    claim,
    cancelUnstake,
    refetchAll,
  };
};
