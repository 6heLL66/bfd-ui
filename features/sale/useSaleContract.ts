import { saleAbi } from '@/config/abi/sale';
import { SALE_CA } from '@/config/berachain';
import { wagmiConfig } from '@/config/wagmi';
import { useTokens } from '@/shared/hooks/useTokens';
import { TokenAmount } from '@berachain-foundation/berancer-sdk';
import { useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';

export const useSaleContract = () => {
  const { address } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const { data: isSaleActive, refetch: refetchIsSaleActive } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'isSaleActive',
  });

  const { data: saleTokenAddress } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'saleToken',
  });

  const { tokensMap, fetchTokens } = useTokens();

  useEffect(() => {
    if (saleTokenAddress && address) {
      fetchTokens([saleTokenAddress as `0x${string}`], address);
    }
  }, [saleTokenAddress, address]);

  console.log(saleTokenAddress)

  const { data: cap } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'cap',
  });

  const { data: isPublicSale, refetch: refetchIsPublicSale } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'isPublicSale',
  });

  const { data: totalRaised, refetch: refetchTotalRaised } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'totalRaised',
  });

  const { data: allocation, refetch: refetchAllocation } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'addressAllocation',
    args: [address],
  });

  const supply = async (amount: bigint) => {
    if (!address) return;

    const tx = await writeContractAsync({
      address: SALE_CA,
      abi: saleAbi,
      functionName: 'buy',
      args: [amount],
    });

    await waitForTransactionReceipt(wagmiConfig, {
      hash: tx,
    });

    readAgain();
  };

  const readAgain = () => {
    refetchIsSaleActive();
    refetchIsPublicSale();
    refetchTotalRaised();
    refetchAllocation();
    fetchTokens([saleTokenAddress as `0x${string}`], address);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      readAgain();
    }, 5000);

    return () => clearInterval(interval);
  }, [address]);

  const saleToken = tokensMap[(saleTokenAddress as `0x${string}`)?.toLowerCase()]?.token;

  const saleTokenFull = tokensMap[(saleTokenAddress as `0x${string}`)?.toLowerCase()];

  return {
    isSaleActive: Boolean(isSaleActive),
    cap: cap !== undefined && saleToken && TokenAmount.fromRawAmount(saleToken, cap as bigint),
    isPublicSale: Boolean(isPublicSale),
    totalRaised: totalRaised !== undefined && saleToken && TokenAmount.fromRawAmount(saleToken, totalRaised as bigint),
    allocation: allocation !== undefined && saleToken && TokenAmount.fromRawAmount(saleToken, allocation as bigint),
    saleToken,
    saleTokenFull,
    supply,
  };
};
