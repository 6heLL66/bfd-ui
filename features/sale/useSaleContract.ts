import { saleAbi } from "@/config/abi/sale";
import { SALE_CA, usdcToken } from "@/config/berachain";
import { wagmiConfig } from "@/config/wagmi";
import { TokenAmount } from "@berachain-foundation/berancer-sdk";
import { useEffect } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";

interface ReturnType {
    isSaleActive: boolean;
    cap: TokenAmount | undefined;
    isPublicSale: boolean;
    totalRaised: TokenAmount | undefined;
    allocation: TokenAmount | undefined;
    supply: (amount: bigint) => Promise<void>;
}

export const useSaleContract = (): ReturnType => {
    const { address } = useAccount();

    const { writeContractAsync } = useWriteContract();

    const { data: isSaleActive, refetch: refetchIsSaleActive } = useReadContract({
        address: SALE_CA,
        abi: saleAbi,
        functionName: "isSaleActive",
    });

    const { data: cap } = useReadContract({
        address: SALE_CA,
        abi: saleAbi,
        functionName: "cap",
    });

    const { data: isPublicSale, refetch: refetchIsPublicSale } = useReadContract({
        address: SALE_CA,
        abi: saleAbi,
        functionName: "isPublicSale",
    });

    const { data: totalRaised, refetch: refetchTotalRaised } = useReadContract({
        address: SALE_CA,
        abi: saleAbi,
        functionName: "totalRaised",
    });

    const { data: allocation, refetch: refetchAllocation } = useReadContract({
        address: SALE_CA,
        abi: saleAbi,
        functionName: "addressAllocation",
        args: [address],
    });

    const supply = async (amount: bigint) => {
        if (!address) return;

        const tx = await writeContractAsync({
            address: SALE_CA,
            abi: saleAbi,
            functionName: "buy",
            args: [amount],
        });

        await waitForTransactionReceipt(wagmiConfig, {
            hash: tx,
        });

        readAgain();
    }

    const readAgain = () => {
        refetchIsSaleActive();
        refetchIsPublicSale();
        refetchTotalRaised();
        refetchAllocation();
    }

    useEffect(() => {
        const interval = setInterval(() => {
            readAgain();
        }, 5000);

        return () => clearInterval(interval);
    }, [address]);

    console.log(address, isSaleActive, cap, isPublicSale, totalRaised, allocation);
    
    return {
        isSaleActive,
        cap: cap !== undefined && TokenAmount.fromRawAmount(usdcToken, cap as bigint),
        isPublicSale,
        totalRaised: totalRaised !== undefined && TokenAmount.fromRawAmount(usdcToken, totalRaised as bigint),
        allocation: allocation !== undefined && TokenAmount.fromRawAmount(usdcToken, allocation as bigint),
        supply,
    } as ReturnType
}