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
    activeIncentives: GqlRewardVaultIncentive[];
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

type Prices = {
    address: string;
    chain: string;
    price: number;
    updatedAt: number;
    updatedBy: string;
    __typename: string;
}[]

interface GqlValidatorMetadata {
    name: string;
    logoURI: string;
    __typename: string;
    website: string;
    description: string;
}

interface GqlValidatorDynamicData {
    activeBoostAmount: string;
    usersActiveBoostCount: number;
    queuedBoostAmount: string;
    usersQueuedBoostCount: number;
    allTimeDistributedBGTAmount: string;
    rewardRate: string;
    stakedBeraAmount: string;
    lastDayDistributedBGTAmount: string;
    activeBoostAmountRank: number;
    __typename: string;
}

interface GqlRewardVaultIncentive {
    active: boolean;
    remainingAmount: string;
    remainingAmountUsd: string;
    incentiveRate: string;
    tokenAddress: string;
    token: GqlToken;
    __typename: string;
}

interface GqlValidatorBlockUptime {
    isActive: boolean;
    __typename: string;
}

interface GqlValidatorRewardAllocationWeight {
    percentageNumerator: number;
    validatorId: string;
    receivingVault: RewardVault;
    receiver: string;
    startBlock: number;
    __typename: string;
}

interface Validator {
    id: string;
    pubkey: string;
    operator: string;
    metadata: GqlValidatorMetadata;
    dynamicData: GqlValidatorDynamicData;
    __typename: string;
    rewardAllocationWeights: GqlValidatorRewardAllocationWeight[];
    lastBlockUptime: GqlValidatorBlockUptime;
}

interface BoostPeriod {
    id: string;
    boost_total_bgt: string;
    rewards_total_usd: string;
    daily_rate: string;
    apr: string;
    apy: string;
    tokens: string[];
    validator: string;
    start_block: number;
    end_block: number;
    start_timestamp: number;
    end_timestamp: number;
    created_at: string;
    updated_at: string;
}

interface RewardPagination {
    next: number;
    previous: number;
    record_per_page: number;
    current_page: number;
    total_page: number;
}

interface RewardItem {
    id: string;
    dist_id: string;
    token: string;
    recipient: string;
    amount: string;
    merkle_proof: string[];
    available_at: number;
}

interface RewardsResponse {
    pagination: RewardPagination;
    rewards: RewardItem[];
}

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
    GqlPoolSnapshot,
    Validator,
    GqlValidatorMetadata,
    GqlValidatorDynamicData,
    GqlValidatorBlockUptime,
    GqlValidatorRewardAllocationWeight,
    GqlRewardVaultIncentive,
    BoostPeriod,
    RewardPagination,
    RewardItem,
    RewardsResponse
};
