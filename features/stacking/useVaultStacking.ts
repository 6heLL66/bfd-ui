import { useQuery } from "@tanstack/react-query";
import { getRewardVault } from "@/shared/api/berachain";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { bgtToken, POOL_ID, VAULT_CA } from "@/config/berachain";
import { BigintIsh, TokenAmount } from "@berachain-foundation/berancer-sdk";
import { useCallback, useEffect } from "react";
import { wagmiConfig } from "@/config/wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { vaultAbi } from "@/config/abi/vault";
import { usePool } from "../pool/usePool";

export const useVaultStacking = (id: string) => {
    const { address } = useAccount()
    const { writeContractAsync } = useWriteContract()

    const { lpToken } = usePool(POOL_ID);

    const { data, isLoading, error } = useQuery({
        queryKey: ['vault-staking', id],
        queryFn: () => getRewardVault(id),
    })

    const {data: staked, refetch: refetchStaked} = useReadContract({
        abi: vaultAbi,
        address: VAULT_CA,
        functionName: 'balanceOf',
        args: [address]
    })

    const {data: rewards, refetch: refetchRewards} = useReadContract({
        abi: vaultAbi,
        address: VAULT_CA,
        functionName: 'earned',
        args: [address]
    })

    useEffect(() => {
        const interval = setInterval(() => {
            refetchRewards();
        }, 10000)

        return () => clearInterval(interval);
    }, [refetchRewards])

    const claim = useCallback(async () => {
        const tx = await writeContractAsync({
            address: VAULT_CA,
            abi: vaultAbi,
            functionName: 'getReward',
            args: [address, address]
        })

        await waitForTransactionReceipt(wagmiConfig, {
            hash: tx,
        });

        refetchRewards();
    }, [writeContractAsync, refetchRewards, address])

    const stake = useCallback(async (amount: BigintIsh) => {
        const tx = await writeContractAsync({
            address: VAULT_CA,
            abi: vaultAbi,
            functionName: 'stake',
            args: [amount]
        })

        await waitForTransactionReceipt(wagmiConfig, {
            hash: tx,
        });

        refetchStaked();
    }, [])

    const unstake = useCallback(async (amount: BigintIsh) => {
        const tx = await writeContractAsync({
            address: VAULT_CA,
            abi: vaultAbi,
            functionName: 'withdraw',
            args: [amount]
        })

        await waitForTransactionReceipt(wagmiConfig, {
            hash: tx,
        });

        refetchStaked();
    }, [])

    return {
        vault: data,
        isLoading,
        error,
        claim,
        stake,
        unstake,
        staked: TokenAmount.fromRawAmount(lpToken, (staked ?? 0) as BigintIsh),
        rewards: TokenAmount.fromRawAmount(bgtToken, (rewards ?? 0) as BigintIsh)
    }
}