import { useQuery } from '@tanstack/react-query';
import { getValidator } from '@/shared/api/berachain';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { bgtToken, CHAIN_ID, INCENCIVE_DISTRIBUTOR_CA, provider } from '@/config/berachain';
import { bgtAbi } from '@/config/abi/bgt';
import { getBalance, waitForTransactionReceipt } from 'wagmi/actions';
import { wagmiConfig } from '@/config/wagmi';
import { Token, TokenAmount } from '@berachain-foundation/berancer-sdk';
import { 
  createQueueBoostToast,
  createCancelBoostToast,
  createActivateBoostToast,
  createQueueDropBoostToast,
  createCancelDropBoostToast,
  createDropBoostToast,
  createClaimAllRewardsToast
} from '@/app/validator/components/toasts';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import Requests from '@/shared/api/requests';
import { useTokens } from '@/shared/hooks/useTokens';
import { incentiveDistributorAbi } from '@/config/abi/incentiveDistributor';

const AVERAGE_BLOCK_TIME = 2;
const WEEKS_IN_YEAR = 52;

type Incentive = {
  token: Token;
  rate: TokenAmount;
}

export const useCurrentBlock = () => {
  const { data: currentBlock } = useQuery({
    queryKey: ['currentBlock'],   
    queryFn: () => provider.getBlockNumber(),
  });

  return currentBlock ?? 0;
};

export const useValidator = (id: string) => {
  const currentBlock = useCurrentBlock();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [bgtBalance, setBgtBalance] = useState<TokenAmount>();

  const { tokens, fetchTokens } = useTokens([bgtToken.address]);

  const { data: validator, refetch: refetchValidator } = useQuery({
    queryKey: ['validator', id],
    queryFn: () => getValidator(id),
  });

  const pubkey = validator?.pubkey;

  useEffect(() => {
    if (address) {
      getBalance(wagmiConfig, { address: address, token: bgtToken.address }).then((balance) => {
        setBgtBalance(TokenAmount.fromRawAmount(bgtToken, balance.value));
      });
    }
  }, [address]);

  const { data: apr } = useQuery({
    queryKey: ['validatorApr'],
    queryFn: () => Requests.getValidatorsApr()
  });

  const { data: rewards, refetch: refetchRewards } = useQuery({
    queryKey: ['validatorRewards', validator?.pubkey, address],
    queryFn: async () => {
      const res = await Requests.getValidatorUserRewards(validator?.pubkey ?? '', address ?? '')
      await fetchTokens(res.map(reward => reward.token), address as `0x${string}`)
      return res
    }
  });

  const {data: activateBoostDelay} = useReadContract({
    address: bgtToken.address,
    abi: bgtAbi,
    functionName: 'activateBoostDelay',
  });

  const {data: dropBoostDelay} = useReadContract({
    address: bgtToken.address,
    abi: bgtAbi,
    functionName: 'dropBoostDelay',
  });

  const { data: boostedQueue, refetch: refetchQueuedBoosts } = useReadContract({
    address: bgtToken.address,
    abi: bgtAbi,
    functionName: 'boostedQueue',
    args: [address, pubkey],
  });

  const { data: boosts, refetch: refetchBoosts } = useReadContract({
    address: bgtToken.address,
    abi: bgtAbi,
    functionName: 'boosts',
    args: [address],
  });

  const { data: dropBoostQueue, refetch: refetchQueueDropBoostAmount } = useReadContract({
    address: bgtToken.address,
    abi: bgtAbi,
    functionName: 'dropBoostQueue',
    args: [address, pubkey],
  });

  const { data: boosted, refetch: refetchBoosted } = useReadContract({
    address: bgtToken.address,
    abi: bgtAbi,
    functionName: 'boosted',
    args: [address, pubkey],
  });

  const queueBoost = async (amount: bigint) => {
    const amountStr = TokenAmount.fromRawAmount(bgtToken, amount).toSignificant();
    const promise = async () => {
      const tx = await writeContractAsync({
        address: bgtToken.address,
        abi: bgtAbi,
        functionName: 'queueBoost',
        args: [pubkey, amount],
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      refetchAll();
    };

    return createQueueBoostToast(promise(), amountStr);
  };

  const cancelBoost = async (amount: bigint) => {
    const amountStr = TokenAmount.fromRawAmount(bgtToken, amount).toSignificant();
    const promise = async () => {
      const tx = await writeContractAsync({
        address: bgtToken.address,
        abi: bgtAbi,
        functionName: 'cancelBoost',
        args: [pubkey, amount],
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      refetchAll();
    };

    return createCancelBoostToast(promise(), amountStr);
  };

  const activateBoost = async () => {
    const amount = (boostedQueue as [number, bigint])?.[1] ?? BigInt(0);
    const amountStr = TokenAmount.fromRawAmount(bgtToken, amount).toSignificant();
    const promise = async () => {
      const tx = await writeContractAsync({
        address: bgtToken.address,
        abi: bgtAbi,
        functionName: 'activateBoost',
        args: [address, pubkey],
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      refetchAll();
    };

    return createActivateBoostToast(promise(), amountStr);
  };

  const queueDropBoost = async (amount: bigint) => {
    const amountStr = TokenAmount.fromRawAmount(bgtToken, amount).toSignificant();
    const promise = async () => {
      const tx = await writeContractAsync({
        address: bgtToken.address,
        abi: bgtAbi,
        functionName: 'queueDropBoost',
        args: [pubkey, amount],
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      refetchAll();
    };

    return createQueueDropBoostToast(promise(), amountStr);
  };

  const cancelDropBoost = async (amount: bigint) => {
    const amountStr = TokenAmount.fromRawAmount(bgtToken, amount).toSignificant();
    const promise = async () => {
      const tx = await writeContractAsync({
        address: bgtToken.address,
        abi: bgtAbi,
        functionName: 'cancelDropBoost',
        args: [pubkey, amount],
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      refetchAll();
    };

    return createCancelDropBoostToast(promise(), amountStr);
  };

  const dropBoost = async () => {
    const amount = typeof boosted === 'bigint' ? boosted : BigInt(0);
    const amountStr = TokenAmount.fromRawAmount(bgtToken, amount).toSignificant();
    const promise = async () => {
      const tx = await writeContractAsync({
        address: bgtToken.address,
        abi: bgtAbi,
        functionName: 'dropBoost',
        args: [address, pubkey],
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      refetchAll();
    };

    return createDropBoostToast(promise(), amountStr);
  };

  const refetchAll = () => {
    refetchQueuedBoosts();
    refetchBoosted();
    refetchValidator();
    refetchQueueDropBoostAmount();
    refetchBoosts();
    refetchRewards();
  };

  const boostApr = apr?.find(period => period.validator === validator?.pubkey)?.apr ?? '0';
  const boostedAmount = TokenAmount.fromRawAmount(bgtToken, (boosted ?? 0) as bigint);
  const availableForBoost = bgtBalance?.sub(TokenAmount.fromRawAmount(bgtToken, (boosts ?? 0) as bigint));
  const availableForDropBoost = boostedAmount?.sub(TokenAmount.fromRawAmount(bgtToken, (dropBoostQueue as [number, bigint])?.[1] ?? BigInt(0)));

  const boostAprRate = TokenAmount.fromHumanAmount(bgtToken, boostApr as `${number}`);

  const weeklybgtPerBgt = +boostAprRate.mulDownFixed(TokenAmount.fromHumanAmount(bgtToken, '1').amount).toSignificant() / WEEKS_IN_YEAR;
  const bgtFullToken = tokens.find(token => token.token.symbol === bgtToken.symbol);
  const weeklyUsdPerBgt = Number(bgtFullToken?.price.toSignificant()) * weeklybgtPerBgt;

  const insencitives = validator?.rewardAllocationWeights.reduce((acc, incentives) => {
    return [...acc, ...incentives.receivingVault.activeIncentives.map((incentive) => {
      const token = new Token(CHAIN_ID, incentive.token.address as `0x${string}`, incentive.token.decimals, incentive.token.symbol);
      return {
        token,
        rate: TokenAmount.fromHumanAmount(token, incentive.incentiveRate as `${number}`)
      }
    })]
  }, [] as Incentive[])

  const dropBoostQueuMemo = useMemo(() => {
    return {
      amount: TokenAmount.fromRawAmount(bgtToken, (dropBoostQueue as [number, bigint])?.[1] ?? BigInt(0)),
      timeReady: Date.now() +(((Number(dropBoostDelay) + (dropBoostQueue as [number, bigint])?.[0]) - currentBlock) * AVERAGE_BLOCK_TIME * 1000),
    }
  }, [dropBoostQueue, dropBoostDelay, currentBlock])

  const rewardsMemo = useMemo(() => {
    return rewards?.map((reward) => {
      const token = tokens.find(token => token.token.address === reward.token);
      return {
        ...reward,
        token: token?.token,
        price: token?.price,
        amount: TokenAmount.fromRawAmount(token?.token ?? bgtToken, reward.amount as `${number}`),
      }
    })
  }, [rewards, tokens])

  const boostedQueueMemo = useMemo(() => {
    return {
      amount: TokenAmount.fromRawAmount(bgtToken, (boostedQueue as [number, bigint])?.[1] ?? BigInt(0)),
      timeReady: Date.now() +(((Number(activateBoostDelay) + (boostedQueue as [number, bigint])?.[0]) - currentBlock) * AVERAGE_BLOCK_TIME * 1000),
    }
  }, [boostedQueue, activateBoostDelay, currentBlock])

  const claimAllRewards = async () => {
    if (!rewardsMemo) return;
    const promise = async () => {
      const tx = await writeContractAsync({
        address: INCENCIVE_DISTRIBUTOR_CA,
        abi: incentiveDistributorAbi,
        functionName: 'claim',
        args: [rewardsMemo.map(reward => ({ identifier: reward.dist_id, account: address, amount: reward.amount.amount, merkleProof: reward.merkle_proof }))]
      });

      await waitForTransactionReceipt(wagmiConfig, { hash: tx });
      refetchAll();
    };

    return createClaimAllRewardsToast(promise());
  }

  return {
    apr: boostApr,
    rewards: rewardsMemo,
    validator,
    weeklyUsdPerBgt,
    boostedQueue: boostedQueueMemo,
    boosted: boostedAmount,
    dropBoostQueue: dropBoostQueuMemo,
    insencitives,
    availableForBoost,
    availableForDropBoost,
    queueBoost,
    cancelBoost,
    activateBoost,
    queueDropBoost,
    cancelDropBoost,
    dropBoost,
    refetchAll,
    claimAllRewards,
  };
};
