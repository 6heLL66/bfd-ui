import { BalancerApi, Token, AddLiquidity, RemoveLiquidity } from '@berachain-foundation/berancer-sdk';

export const RPC_URL = 'https://rpc.berachain.com/';

export const CHAIN_ID = 80094;
export const U256_MAX = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export const SALE_CA = process.env.NEXT_PUBLIC_SALE_CA as `0x${string}`;
export const STACKING_CA = process.env.NEXT_PUBLIC_STACKING_CA as `0x${string}`;
export const BFD_CA = process.env.NEXT_PUBLIC_BFD_CA as `0x${string}`;
export const VAULT_CA = process.env.NEXT_PUBLIC_VAULT_CA as `0x${string}`;
export const POOL_ID = process.env.NEXT_PUBLIC_POOL_ID as `0x${string}`;

export const balancerApi = new BalancerApi('https://api.berachain.com/', CHAIN_ID);

export const honeyToken = new Token(CHAIN_ID, '0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce', 18, 'HONEY');
export const usdcToken = new Token(CHAIN_ID, '0x549943e04f40284185054145c6E4e9568C1D3241', 6, 'USDC');
export const beraHoneyLpToken = new Token(CHAIN_ID, '0x2c4a603a2aa5596287a06886862dc29d56dbc354', 18, '50WBERA-50HONEY-WEIGHTED');
export const bgtToken = new Token(CHAIN_ID, '0x656b95E550C07a9ffe548bd4085c72418Ceb1dba', 18, 'BGT');
export const bfdToken = new Token(CHAIN_ID, BFD_CA, 18, '$BFD');

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
