import { wagmiConfig } from '@/config/wagmi';
import { tokenAbi } from '@/config/berachain';
import { useAccount, useWriteContract } from 'wagmi';
import { readContract, waitForTransactionReceipt } from 'wagmi/actions';
import { Token } from '@berachain-foundation/berancer-sdk';

export const useApprove = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const approve = async (to: `0x${string}`, amount: bigint, token: Token) => {
    if (!address) return;

    const hash = await writeContractAsync({
      abi: tokenAbi,
      functionName: 'approve',
      address: token.address,
      args: [to, amount],
    });

    return waitForTransactionReceipt(wagmiConfig, {
      hash,
    });
  };

  const checkAllowance = async (to: `0x${string}`, amount: bigint, token: Token) => {
    const allowance = (await readContract(wagmiConfig, {
      abi: tokenAbi,
      functionName: 'allowance',
      address: token.address,
      args: [address, to],
    })) as bigint;

    console.log(allowance, amount);

    return allowance < amount;
  };

  return {
    approve,
    checkAllowance,
  };
};
