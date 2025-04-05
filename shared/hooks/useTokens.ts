import { wagmiConfig } from "@/config/wagmi";
import { Token, TokenAmount } from "@berachain-foundation/berancer-sdk";
import { useEffect, useMemo } from "react";
import { getBalance, GetBalanceReturnType } from "wagmi/actions";
import { getTokensPrice } from "../api/berachain";
import { Prices } from "../api/types";
import { getTokenImageUrl } from "../utils";
import { create } from 'zustand';
import { useAccount, useChainId } from "wagmi";
import { debounce, DebouncedFunc } from "lodash";

export type FullToken = {
    token: Token,
    balance: TokenAmount,
    balanceUSD: TokenAmount,
    price: TokenAmount,
    updatedAt: number,
    logo: string
}

interface TokensState {
    tokens: FullToken[];
    setTokens: (tokens: FullToken[]) => void;
    addressesToLoad: string[];
    loadTokens: DebouncedFunc<(chainId: number, address?: string) => Promise<void>>;
    fetchTokens: (addresses: string[], chainId: number, address?: string,) => Promise<void>;
}

const useTokensStore = create<TokensState>((set, get) => ({
    tokens: [],
    setTokens: (tokens) => set({ tokens }),
    addressesToLoad: [],
    loadTokens: debounce(async (chainId: number, address: string) => {
        const { addressesToLoad } = get();

        if (!addressesToLoad || addressesToLoad.length === 0) return;
        
        try {
            const [balances, prices] = await Promise.all([
                Promise.all(addressesToLoad.map((_address) => getBalance(wagmiConfig, {
                    address: address as `0x${string}`,
                    token: _address as `0x${string}`
                }).catch(() => ({ value: 0, decimals: 18, symbol: '' })))), 
                getTokensPrice(addressesToLoad)
            ]);

            if (!balances || !prices) return;

            const tokens = addressesToLoad.map((address, index) => {
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
                    updatedAt: Date.now(),
                    logo: getTokenImageUrl(token)
                }
            });
            set((prev) => ({ ...prev, tokens: [...tokens, ...prev.tokens.filter(token => !tokens.find(t => t.token.address === token.token.address))], loading: false }));
        } catch (error) {
            console.error("Error fetching tokens:", error);
        }
    }, 250),
    fetchTokens: async (addresses, chainId, address) => {
        if (!addresses || addresses.length === 0) return;

        set({ addressesToLoad: Array.from(new Set([...get().addressesToLoad, ...addresses])) });
        get().loadTokens(chainId, address);
    }
}));

export const useTokens = (addresses?: string[]) => {
    const { address } = useAccount();
    const { tokens, fetchTokens } = useTokensStore();
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

    return { tokens, fetchTokens: (addresses: string[], address?: string) => fetchTokens(addresses, chainId, address), tokensMap };
}