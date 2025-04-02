import { Token } from '@berachain-foundation/berancer-sdk';

export const U256_MAX = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export const SALE_CA = process.env.NEXT_PUBLIC_SALE_CA as `0x${string}`;
export const STACKING_CA = process.env.NEXT_PUBLIC_STACKING_CA as `0x${string}`;
export const BFD_CA = process.env.NEXT_PUBLIC_BFD_CA as `0x${string}`;
export const VAULT_CA = process.env.NEXT_PUBLIC_VAULT_CA as `0x${string}`;
export const POOL_ID = process.env.NEXT_PUBLIC_POOL_ID as `0x${string}`;
export const VALIDATOR_ID = process.env.NEXT_PUBLIC_VALIDATOR_ID as `0x${string}`;
export const INCENCIVE_DISTRIBUTOR_CA = process.env.NEXT_PUBLIC_INCENCIVE_DISTRIBUTOR_CA as `0x${string}`;

export const bgtToken = new Token(1, process.env.NEXT_PUBLIC_BGT_CA as `0x${string}`, 18, 'BGT');
export const bfdToken = new Token(1, process.env.NEXT_PUBLIC_BFD_CA as `0x${string}`, 18, 'BFD');

export const tokenAbi = [
  {
    name: 'approve',
    type: 'function',
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    name: 'allowance',
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [
      {
        name: 'remaining',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'totalSupply',
    type: 'function',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
];
