import { saleAbi } from '@/config/abi/sale';
import { SALE_CA } from '@/config/berachain';
import { wagmiConfig } from '@/config/wagmi';
import { useTokens } from '@/shared/hooks/useTokens';
import { Token, TokenAmount } from '@berachain-foundation/berancer-sdk';
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

  const { data: wlRaised, refetch: refetchWlRaised } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'wlRaised',
  });

  const { data: publicRaised, refetch: refetchPublicRaised } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'publicRaised',
  });

  const { data: wlPrice } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'wlPrice',
  });

  const { data: publicPrice } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'publicPrice',
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
    refetchWlRaised();
    refetchPublicRaised();
    refetchAllocation();
    fetchTokens([saleTokenAddress as `0x${string}`], address);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      readAgain();
    }, 5000);

    return () => clearInterval(interval);
  }, [address]);

  const usdcToken = new Token(1, '0x0000000000000000000000000000000000000000', 6, 'USDC', 'USD Coin');
  const saleToken = tokensMap[(saleTokenAddress as `0x${string}`)?.toLowerCase()]?.token ?? usdcToken;

  const saleTokenFull = tokensMap[(saleTokenAddress as `0x${string}`)?.toLowerCase()];

  const wlRaisedAmount = TokenAmount.fromRawAmount(saleToken, (wlRaised ?? 0) as bigint);
  const publicRaisedAmount = TokenAmount.fromRawAmount(saleToken, (publicRaised ?? 0) as bigint);

  const totalRaised = wlRaisedAmount.add(publicRaisedAmount);

  return {
    isSaleActive: Boolean(isSaleActive),
    cap: cap !== undefined && saleToken && TokenAmount.fromRawAmount(saleToken, cap as bigint),
    isPublicSale: Boolean(isPublicSale),
    totalRaised,
    wlPrice: TokenAmount.fromRawAmount(saleToken, (wlPrice ?? 0) as bigint),
    publicPrice: TokenAmount.fromRawAmount(saleToken, (publicPrice ?? 0) as bigint),
    allocation: TokenAmount.fromRawAmount(saleToken, (allocation ?? 0) as bigint),
    saleToken,
    saleTokenFull,
    supply,
  };
};
