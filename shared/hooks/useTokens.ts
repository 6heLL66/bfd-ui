import { wagmiConfig } from "@/config/wagmi";
import { Token, TokenAmount } from "@berachain-foundation/berancer-sdk";
import { useEffect, useMemo } from "react";
import { getBalance, GetBalanceReturnType } from "wagmi/actions";
import { getTokensPrice } from "../api/berachain";
import { Prices } from "../api/types";
import { getTokenImageUrl } from "../utils";
import { create } from 'zustand';
import { useAccount, useChainId } from "wagmi";

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
    fetchTokens: (addresses: string[], chainId: number, address?: string,) => Promise<void>;
}

const useTokensStore = create<TokensState>((set) => ({
    tokens: [],
    setTokens: (tokens) => set({ tokens }),
    loading: false,
    setLoading: (loading) => set({ loading }),
    fetchTokens: async (addresses, chainId, address) => {
        if (!addresses || addresses.length === 0) return;
        
        set({ loading: true });
        try {
            const [balances, prices] = await Promise.all([
                Promise.all(addresses.map((_address) => getBalance(wagmiConfig, {
                    address: address as `0x${string}`,
                    token: _address as `0x${string}`
                }).catch(() => ({ value: 0, decimals: 18, symbol: '' })))), 
                getTokensPrice(addresses)
            ]);

            if (!balances || !prices) return;

            const tokens = addresses.map((address, index) => {
                const balance = balances[index as keyof typeof balances] as GetBalanceReturnType;
                const price = prices.find((price) => price.address === address.toLocaleLowerCase()) as Prices[0];
                const token = new Token(chainId, address as `0x${string}`, balance.decimals, balance.symbol);

                const balanceAmount = TokenAmount.fromRawAmount(token, balance.value);
                const priceAmount = TokenAmount.fromHumanAmount(token, String(price?.price ?? 0) as `${number}`);

                return { 
                    token,
                    balance: balanceAmount,
                    price: priceAmount,
                    balanceUSD: balanceAmount.mulUpFixed(priceAmount.amount),
                    logo: getTokenImageUrl(token)
                }
            });
            set((prev) => ({ ...prev, tokens: [...tokens, ...prev.tokens.filter(token => !tokens.find(t => t.token.address === token.token.address))], loading: false }));
        } catch (error) {
            console.error("Error fetching tokens:", error);
            set({ loading: false });
        }
    }
}));

export const useTokens = (addresses?: string[]) => {
    const { address } = useAccount();
    const { tokens, fetchTokens, loading } = useTokensStore();
    const chainId = useChainId();

    useEffect(() => {
        if (addresses && addresses.length > 0) {
            fetchTokens(addresses, chainId, address);
        }
    }, [address, chainId]);

    const tokensMap = useMemo(() => {
        return tokens.reduce((acc, token) => {
            acc[token.token.address] = token;
            return acc;
        }, {} as Record<string, FullToken>);
    }, [tokens]);

    return { tokens, fetchTokens: (addresses: string[], address?: string) => fetchTokens(addresses, chainId, address), loading, tokensMap };
}