import { useQuery } from "@tanstack/react-query";
import { getRewardVault } from "@/shared/api/berachain";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { vaultAbi } from "@/config/abi/vault";
import { beraHoneyLpToken, bgtToken, VAULT_CA } from "@/config/berachain";
import { BigintIsh, TokenAmount } from "@berachain-foundation/berancer-sdk";
import { useCallback } from "react";
import { wagmiConfig } from "@/config/wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";

export const useVaultStacking = (id: string) => {
    const { address } = useAccount()
    const { writeContractAsync } = useWriteContract()

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

    const claim = useCallback(async () => {
        if (!data) return;
        const tx = await writeContractAsync({
            address: VAULT_CA,
            abi: vaultAbi,
            functionName: 'claimReward',
            args: [address, address]
        })

        await waitForTransactionReceipt(wagmiConfig, {
            hash: tx,
        });

        refetchRewards();
    }, [data, writeContractAsync, refetchRewards])

    return {
        vault: data,
        isLoading,
        error,
        claim,

        staked: TokenAmount.fromRawAmount(beraHoneyLpToken, (staked ?? 0) as BigintIsh),
        rewards: TokenAmount.fromRawAmount(bgtToken, (rewards ?? 0) as BigintIsh)
    }
}