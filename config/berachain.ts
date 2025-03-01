import { BalancerApi, Token } from "@berachain-foundation/berancer-sdk";

export const RPC_URL = "https://rpc.berachain.com/";

export const CHAIN_ID = 80094;

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
