import { BalancerApi, Token } from "@berachain-foundation/berancer-sdk";

export const RPC_URL = "https://rpc.berachain.com/";

export const CHAIN_ID = 80094;
export const U256_MAX = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export const SALE_CA = process.env.NEXT_PUBLIC_SALE_CA as `0x${string}`;

export const balancerApi = new BalancerApi(
  "https://api.berachain.com/",
  CHAIN_ID
);

export const honeyToken = new Token(
  CHAIN_ID,
  "0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce",
  18,
  "HONEY"
);
export const usdcToken = new Token(
  CHAIN_ID,
  "0x549943e04f40284185054145c6E4e9568C1D3241",
  6,
  "USDC"
);

export const tokenAbi = [
  {
    name: "approve",
    type: "function",
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    name: "allowance",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" }
    ],
    outputs: [
      {
        name: "remaining",
        type: "uint256",
      },
    ],
  }
];
