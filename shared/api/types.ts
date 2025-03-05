interface TreasuryHistory {
    total_usd_value: number;
    created_at: string;
    id: string;
    total_supply: number;
    token_price: number;
    backing: number;
}

interface Token {
    symbol: string;
    amount: number;
    price: number;
    chain: string;
}

interface TokensData {
    id: string;
    updated_at: number;
    tokens: Token[];
}

export type { TreasuryHistory, TokensData };
