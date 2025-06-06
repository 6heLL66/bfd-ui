export const bgtAbi = [
  {
    type: 'function',
    name: 'activateBoost',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'activateBoostDelay',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'boosted',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'boostedQueue',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'blockNumberLast',
        type: 'uint32',
        internalType: 'uint32',
      },
      {
        name: 'balance',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'boostees',
    inputs: [
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'boosts',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'cancelBoost',
    inputs: [
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cancelDropBoost',
    inputs: [
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'delegate',
    inputs: [
      {
        name: 'delegatee',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'delegateBySig',
    inputs: [
      {
        name: 'delegatee',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'nonce',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'expiry',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'v',
        type: 'uint8',
        internalType: 'uint8',
      },
      {
        name: 'r',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 's',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'delegates',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'dropBoost',
    inputs: [
      {
        name: 'user',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'dropBoostDelay',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'dropBoostQueue',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'blockNumberLast',
        type: 'uint32',
        internalType: 'uint32',
      },
      {
        name: 'balance',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPastTotalSupply',
    inputs: [
      {
        name: 'timepoint',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPastVotes',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'timepoint',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getVotes',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: 'distributor',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'minter',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'normalizedBoost',
    inputs: [
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'queueBoost',
    inputs: [
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'queueDropBoost',
    inputs: [
      {
        name: 'pubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'queuedBoost',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'redeem',
    inputs: [
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setActivateBoostDelay',
    inputs: [
      {
        name: '_activateBoostDelay',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setDropBoostDelay',
    inputs: [
      {
        name: '_dropBoostDelay',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMinter',
    inputs: [
      {
        name: '_minter',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setStaker',
    inputs: [
      {
        name: '_staker',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'staker',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalBoosts',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'unboostedBalanceOf',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'whitelistSender',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'ActivateBoost',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        indexed: true,
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ActivateBoostDelayChanged',
    inputs: [
      {
        name: 'newDelay',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CancelBoost',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        indexed: true,
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'CancelDropBoost',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        indexed: true,
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DelegateChanged',
    inputs: [
      {
        name: 'delegator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'fromDelegate',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'toDelegate',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DelegateVotesChanged',
    inputs: [
      {
        name: 'delegate',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'previousVotes',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'newVotes',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DropBoost',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        indexed: true,
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'DropBoostDelayChanged',
    inputs: [
      {
        name: 'newDelay',
        type: 'uint32',
        indexed: false,
        internalType: 'uint32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MinterChanged',
    inputs: [
      {
        name: 'previous',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'current',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'QueueBoost',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        indexed: true,
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'QueueDropBoost',
    inputs: [
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'pubkey',
        type: 'bytes',
        indexed: true,
        internalType: 'bytes',
      },
      {
        name: 'amount',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Redeem',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'receiver',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SenderWhitelisted',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'StakerChanged',
    inputs: [
      {
        name: 'previous',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'current',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AmountLessThanMinIncentiveRate',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CannotRecoverIncentiveToken',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CannotRecoverRewardToken',
    inputs: [],
  },
  {
    type: 'error',
    name: 'CannotRecoverStakingToken',
    inputs: [],
  },
  {
    type: 'error',
    name: 'DepositNotMultipleOfGwei',
    inputs: [],
  },
  {
    type: 'error',
    name: 'DepositValueTooHigh',
    inputs: [],
  },
  {
    type: 'error',
    name: 'DonateAmountLessThanPayoutAmount',
    inputs: [],
  },
  {
    type: 'error',
    name: 'IncentiveRateTooHigh',
    inputs: [],
  },
  {
    type: 'error',
    name: 'IndexOutOfRange',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsolventReward',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientDelegateStake',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientDeposit',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientSelfStake',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientStake',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidActivateBoostDelay',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidBaseRate',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidBoostMultiplier',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidCredentialsLength',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidDropBoostDelay',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidMaxIncentiveTokensCount',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidMinBoostedRewardRate',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidProof',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidPubKeyLength',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidRewardAllocationWeights',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidRewardConvexity',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidRewardRate',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidSignatureLength',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidStartBlock',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidateDefaultRewardAllocation',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvariantCheckFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MaxNumWeightsPerRewardAllocationIsZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MinIncentiveRateIsZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotAContract',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotApprovedSender',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotBGT',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotBlockRewardController',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotDelegate',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotDistributor',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotEnoughBalance',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotEnoughBoostedBalance',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotEnoughTime',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotFactoryVault',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotFeeCollector',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotIncentiveManager',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotNewOperator',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotOperator',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotWhitelistedVault',
    inputs: [],
  },
  {
    type: 'error',
    name: 'OperatorAlreadySet',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PayoutAmountIsZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'RewardAllocationAlreadyQueued',
    inputs: [],
  },
  {
    type: 'error',
    name: 'RewardAllocationBlockDelayTooLarge',
    inputs: [],
  },
  {
    type: 'error',
    name: 'RewardCycleNotEnded',
    inputs: [],
  },
  {
    type: 'error',
    name: 'RewardsDurationIsZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'StakeAmountIsZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TimestampAlreadyProcessed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TokenAlreadyWhitelistedOrLimitReached',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TokenNotWhitelisted',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TooManyWeights',
    inputs: [],
  },
  {
    type: 'error',
    name: 'TotalSupplyOverflow',
    inputs: [],
  },
  {
    type: 'error',
    name: 'VotesExpiredSignature',
    inputs: [
      {
        name: 'expiry',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'WithdrawAmountIsZero',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ZeroOperatorOnFirstDeposit',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ZeroPercentageWeight',
    inputs: [],
  },
];
