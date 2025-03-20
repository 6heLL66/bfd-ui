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

interface GqlToken {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    __typename: string;
}

interface GqlRewardVaultDynamicData {
    allTimeReceivedBGTAmount: string;
    apr: string;
    bgtCapturePercentage: string;
    activeIncentivesValueUsd: string;
    __typename: string;
}

interface GqlRewardVaultMetadata {
    name: string;
    logoURI: string;
    url: string;
    protocolName: string;
    description: string;
    __typename: string;
}

interface RewardVault {
    id: string;
    vaultAddress: string;
    address: string;
    isVaultWhitelisted: boolean;
    dynamicData: GqlRewardVaultDynamicData;
    stakingToken: GqlToken;
    metadata: GqlRewardVaultMetadata;
    activeIncentives: any[];
}

export type { TreasuryHistory, TokensData, RewardVault, GqlToken, GqlRewardVaultDynamicData, GqlRewardVaultMetadata };
