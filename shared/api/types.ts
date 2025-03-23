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

interface GqlPoolTokenDetail {
    index: number;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    weight: null | number;
    balance: string;
    balanceUSD: string;
    __typename: string;
}

interface GqlPoolAprItem {
    apr: number;
    type: string;
    id: string;
    __typename: string;
}

interface GqlPoolDynamicData {
    totalShares: string;
    fees24h: string;
    volume24h: string;
    swapFee: string;
    isInRecoveryMode: boolean;
    isPaused: boolean;
    totalLiquidity: string;
    aprItems: GqlPoolAprItem[];
    __typename: string;
}

interface Pool {
    id: `0x${string}`;
    name: string;
    address: `0x${string}`;
    factory: string;
    protocolVersion: number;
    type: string;
    createTime: number;
    tokens: GqlPoolTokenDetail[];
    dynamicData: GqlPoolDynamicData;
}

interface GqlPoolSnapshot {
    id: string;
    volume24h: string;
    totalSwapVolume: string;
    timestamp: number;
    totalLiquidity: string;
    fees24h: string;
    totalSwapFee: string;
    __typename: string;
}

type Prices ={
    address: string;
    chain: string;
    price: number;
    updatedAt: number;
    updatedBy: string;
    __typename: string;
}[]

export type { 
    TreasuryHistory, 
    TokensData, 
    RewardVault, 
    GqlToken, 
    GqlRewardVaultDynamicData, 
    GqlRewardVaultMetadata,
    GqlPoolTokenDetail,
    GqlPoolAprItem,
    GqlPoolDynamicData,
    Pool,
    Prices,
    GqlPoolSnapshot
};
