import { saleAbi } from '@/config/abi/sale';
import { wberaToken, bfdToken, SALE_CA } from '@/config/berachain';
import { wagmiConfig } from '@/config/wagmi';
import { TokenAmount } from '@berachain-foundation/berancer-sdk';
import { useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';


export const useSaleContract = () => {
  const { address } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const saleToken = wberaToken;
  const outToken = bfdToken;

  const { data: isSaleActive, refetch: refetchIsSaleActive } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'isSaleActive',
  });

  const { data: price } = useReadContract({
    address: SALE_CA,
    abi: saleAbi,
    functionName: 'price',
  });

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
  };

  useEffect(() => {
    const interval = setInterval(() => {
      readAgain();
    }, 5000);

    return () => clearInterval(interval);
  }, [address]);

  return {
    isSaleActive: isSaleActive as boolean,
    cap: TokenAmount.fromRawAmount(saleToken, (cap ?? 0) as bigint),
    isPublicSale: isPublicSale as boolean,
    totalRaised: TokenAmount.fromRawAmount(saleToken, (totalRaised ?? 0) as bigint),
    allocation: TokenAmount.fromRawAmount(saleToken, (allocation ?? 0) as bigint),
    price: TokenAmount.fromRawAmount(saleToken, (price ?? 0) as bigint),
    saleToken,
    outToken,
    supply,
  };
};
