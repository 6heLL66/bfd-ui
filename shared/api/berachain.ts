import { GqlPoolSnapshot, Pool, Prices, RewardVault, Validator } from './types';

const CHAIN = process.env.NEXT_PUBLIC_DEV === 'true' ? 'BEPOLIA' : 'BERACHAIN';

export const getTokensPrice = async (token_addresses: string[]) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BALANCER_API_URL ?? '', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
        'content-type': 'application/json',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
      referrer: 'https://hub.berachain.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: `{\"operationName\":\"GetTokenCurrentPrices\",\"variables\":{\"chains\":[\"${CHAIN}\"],\"addressIn\": ${JSON.stringify(token_addresses)}},\"query\":\"query GetTokenCurrentPrices($chains: [GqlChain!]!, $addressIn: [String!]!) {\\n  tokenGetCurrentPrices(chains: $chains, addressIn: $addressIn) {\\n    address\\n    chain\\n    price\\n    updatedAt\\n    updatedBy\\n    __typename\\n  }\\n}\"}`,
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    }).then(res => res.json());

    return response?.data?.tokenGetCurrentPrices as Prices;
  } catch (error) {
    console.error(error);
  }
};

export const getRewardVault = async (id: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BALANCER_API_URL ?? '', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,ru;q=0.8',
        'content-type': 'application/json',
        priority: 'u=1, i',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
      },
      referrer: 'https://hub.berachain.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: `{\"operationName\":\"GetRewardVault\",\"variables\":{\"vaultId\":\"${id}\",\"chain\":\"${CHAIN}\"},\"query\":\"query GetRewardVault($vaultId: String!, $chain: GqlChain!) {\\n  rewardVault: polGetRewardVault(vaultAddress: $vaultId, chain: $chain) {\\n    ...ApiVault\\n    __typename\\n  }\\n}\\n\\nfragment ApiVault on GqlRewardVault {\\n  id: vaultAddress\\n  vaultAddress\\n  address: vaultAddress\\n  isVaultWhitelisted\\n  dynamicData {\\n    allTimeReceivedBGTAmount\\n    apr\\n    bgtCapturePercentage\\n    activeIncentivesValueUsd\\n    __typename\\n  }\\n  stakingToken {\\n    address\\n    name\\n    symbol\\n    decimals\\n    __typename\\n  }\\n  metadata {\\n    name\\n    logoURI\\n    url\\n    protocolName\\n    description\\n    __typename\\n  }\\n  activeIncentives {\\n    ...ApiVaultIncentive\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ApiVaultIncentive on GqlRewardVaultIncentive {\\n  active\\n  remainingAmount\\n  remainingAmountUsd\\n  incentiveRate\\n  tokenAddress\\n  token {\\n    address\\n    name\\n    symbol\\n    decimals\\n    __typename\\n  }\\n  __typename\\n}\"}`,
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    }).then(res => res.json());

    return response?.data?.rewardVault as RewardVault;
  } catch (error) {
    console.error(error);
  }
};

export const getPool = async (id: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BALANCER_API_URL ?? '', {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrer": "https://hub.berachain.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"operationName\":\"GetPool\",\"variables\":{\"id\":\"${id}\",\"chain\":\"${CHAIN}\"},\"query\":\"query GetPool($id: String!, $userAddress: String, $chain: GqlChain!) {\\n  poolGetPool(id: $id, userAddress: $userAddress, chain: $chain) {\\n    ...MinimalPool\\n    __typename\\n  }\\n}\\n\\nfragment MinimalPool on GqlPoolBase {\\n  id\\n  name\\n  address\\n  factory\\n  address\\n  protocolVersion\\n  type\\n  createTime\\n  tokens: poolTokens {\\n    index\\n    address\\n    symbol\\n    name\\n    decimals\\n    weight\\n    balance\\n    balanceUSD\\n    __typename\\n  }\\n  dynamicData {\\n    ...DynamicData\\n    __typename\\n  }\\n  rewardVault {\\n    ...RewardVault\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment DynamicData on GqlPoolDynamicData {\\n  totalShares\\n  fees24h\\n  volume24h\\n  swapFee\\n  isInRecoveryMode\\n  isPaused\\n  totalLiquidity\\n  aprItems {\\n    apr\\n    type\\n    id\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment RewardVault on GqlRewardVault {\\n  dynamicData {\\n    activeIncentivesValueUsd\\n    apr\\n    bgtCapturePercentage\\n    allTimeReceivedBGTAmount\\n    __typename\\n  }\\n  isVaultWhitelisted\\n  vaultAddress\\n  stakingTokenAddress\\n  __typename\\n}\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    }).then(res => res.json());

    return response?.data?.poolGetPool as Pool;
  } catch (error) {
    console.error(error);
  }
};

export const getPoolHistoricalData = async (id: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BALANCER_API_URL ?? '', {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrer": "https://hub.berachain.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"operationName\":\"GetPoolHistoricalData\",\"variables\":{\"poolId\":\"${id}\",\"chain\":\"${CHAIN}\"},\"query\":\"query GetPoolHistoricalData($poolId: String!, $chain: GqlChain!) {\\n  poolGetSnapshots(id: $poolId, range: NINETY_DAYS, chain: $chain) {\\n    ...PoolHistoricalData\\n    __typename\\n  }\\n}\\n\\nfragment PoolHistoricalData on GqlPoolSnapshot {\\n  id\\n  volume24h\\n  totalSwapVolume\\n  timestamp\\n  totalLiquidity\\n  fees24h\\n  totalSwapFee\\n  __typename\\n}\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    }).then(res => res.json());

    return response?.data?.poolGetSnapshots as GqlPoolSnapshot[];
  } catch (error) {
    console.error(error);
  }
};

export const getValidator = async (id: string) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BALANCER_API_URL ?? '', {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrer": "https://hub.berachain.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"operationName\":\"GetValidator\",\"variables\":{\"id\":\"${id}\",\"chain\":\"${CHAIN}\"},\"query\":\"query GetValidator($id: String!, $chain: GqlChain!) {\\n  validator: polGetValidator(validatorId: $id, chain: $chain) {\\n    ...ApiValidator\\n    __typename\\n  }\\n  uptime: polGetValidatorBlockUptimes(validatorId: $id, chain: $chain) {\\n    ...ApiValidatorBlockUptime\\n    __typename\\n  }\\n}\\n\\nfragment ApiValidator on GqlValidator {\\n  ...ApiValidatorMinimal\\n  operator\\n  rewardAllocationWeights {\\n    ...ApiRewardAllocationWeight\\n    __typename\\n  }\\n  lastBlockUptime {\\n    isActive\\n    __typename\\n  }\\n  metadata {\\n    name\\n    logoURI\\n    website\\n    description\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ApiValidatorMinimal on GqlValidator {\\n  id\\n  pubkey\\n  operator\\n  metadata {\\n    name\\n    logoURI\\n    __typename\\n  }\\n  dynamicData {\\n    activeBoostAmount\\n    usersActiveBoostCount\\n    queuedBoostAmount\\n   boostApr\\n    usersQueuedBoostCount\\n    allTimeDistributedBGTAmount\\n    rewardRate\\n    stakedBeraAmount\\n    lastDayDistributedBGTAmount\\n    activeBoostAmountRank\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ApiRewardAllocationWeight on GqlValidatorRewardAllocationWeight {\\n  percentageNumerator\\n  validatorId\\n  receivingVault {\\n    ...ApiVault\\n    __typename\\n  }\\n  receiver\\n  startBlock\\n  __typename\\n}\\n\\nfragment ApiVault on GqlRewardVault {\\n  id: vaultAddress\\n  vaultAddress\\n  address: vaultAddress\\n  isVaultWhitelisted\\n  dynamicData {\\n    allTimeReceivedBGTAmount\\n    apr\\n    bgtCapturePercentage\\n    activeIncentivesValueUsd\\n    __typename\\n  }\\n  stakingToken {\\n    address\\n    name\\n    symbol\\n    decimals\\n    __typename\\n  }\\n  metadata {\\n    name\\n    logoURI\\n    url\\n    protocolName\\n    description\\n    __typename\\n  }\\n  activeIncentives {\\n    ...ApiVaultIncentive\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ApiVaultIncentive on GqlRewardVaultIncentive {\\n  active\\n  remainingAmount\\n  remainingAmountUsd\\n  incentiveRate\\n  tokenAddress\\n  token {\\n    address\\n    name\\n    symbol\\n    decimals\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ApiValidatorBlockUptime on GqlValidatorBlockUptime {\\n  isActive\\n  isProposer\\n  isSigner\\n  status\\n  blockNumber\\n  __typename\\n}\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    }).then(res => res.json());

    return response?.data?.validator as Validator;
  } catch (error) {
    console.error(error);
  }
};

