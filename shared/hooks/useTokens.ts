import { wagmiConfig } from "@/config/wagmi";
import { Token, TokenAmount } from "@berachain-foundation/berancer-sdk";
import { useEffect } from "react";
import { getBalance, GetBalanceReturnType } from "wagmi/actions";
import { getTokensPrice } from "../api/berachain";
import { Prices } from "../api/types";
import { getTokenImageUrl } from "../utils";
import { CHAIN_ID } from "@/config/berachain";
import { create } from 'zustand';
import { useAccount } from "wagmi";

export type FullToken = {
    token: Token,
    balance: TokenAmount,
    balanceUSD: TokenAmount,
    price: TokenAmount,
    logo: string
}

interface TokensState {
    tokens: FullToken[];
    setTokens: (tokens: FullToken[]) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    fetchTokens: (addresses: string[], address: string) => Promise<void>;
}

const useTokensStore = create<TokensState>((set) => ({
    tokens: [],
    setTokens: (tokens) => set({ tokens }),
    loading: false,
    setLoading: (loading) => set({ loading }),
    fetchTokens: async (addresses, address) => {
        if (!addresses || addresses.length === 0) return;
        
        set({ loading: true });
        try {
            const [balances, prices] = await Promise.all([
                Promise.all(addresses.map((_address) => getBalance(wagmiConfig, {
                    address: address as `0x${string}`,
                    token: _address as `0x${string}`
                }))), 
                getTokensPrice(addresses)
            ]);

            if (!balances || !prices) return;

            const tokens = addresses.map((address, index) => {
                const balance = balances[index as keyof typeof balances] as GetBalanceReturnType;
                const price = prices.find((price) => price.address === address) as Prices[0];
                const token = new Token(CHAIN_ID, address as `0x${string}`, balance.decimals, balance.symbol);

                const balanceAmount = TokenAmount.fromRawAmount(token, balance.value);
                const priceAmount = TokenAmount.fromHumanAmount(token, String(price.price) as `${number}`);

                return { 
                    token,
                    balance: balanceAmount,
                    price: priceAmount,
                    balanceUSD: balanceAmount.mulUpFixed(priceAmount.amount),
                    logo: getTokenImageUrl(token)
                }
            });
            set((prev) => ({ ...prev, tokens, loading: false }));
        } catch (error) {
            console.error("Error fetching tokens:", error);
            set({ loading: false });
        }
    }
}));

export const useTokens = (addresses?: string[]) => {
    const { address } = useAccount();
    const { tokens, fetchTokens, loading } = useTokensStore();

    useEffect(() => {
        if (addresses && address && addresses.length > 0) {
            fetchTokens(addresses, address);
        }
    }, [addresses, address, fetchTokens]);

    return { tokens, fetchTokens, loading };
}