
import { honeyToken } from "@/config/berachain";
import { balancerApi, CHAIN_ID, RPC_URL, usdcToken } from "@/config/berachain";
import {
  ExactInQueryOutput,
  Slippage,
  Swap,
  SwapKind,
  Token,
  TokenAmount,
} from "@berachain-foundation/berancer-sdk";
import { useState, useCallback } from "react";
import { useAccount, useSendTransaction, useWriteContract } from "wagmi";
import { debounce } from "lodash";
import { useSwapSettings } from "./store/swapSettings";

export const slippageOptions = ["0.1", "1.0", "2.5"];


export const useSwap = () => {
  const [token1, setToken1] = useState<Token>(usdcToken);
  const [token2, setToken2] = useState<Token>(honeyToken);

  const { slippage, deadline, setSlippage, setDeadline } = useSwapSettings();

  const [token1Price, setToken1Price] = useState<number>(0);
  const [token2Price, setToken2Price] = useState<number>(0);
  const [swapAmount, setSwapAmount] = useState<TokenAmount>(
    TokenAmount.fromHumanAmount(usdcToken, "0")
  );
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { sendTransactionAsync } = useSendTransaction();

  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

  const [swapObject, setSwapObject] = useState<{
    swap: Swap;
    queryOutput: ExactInQueryOutput;
  } | null>(null);

  const preview = useCallback(async (swapAmount: TokenAmount, token1: Token, token2: Token) => {
    if (!isConnected || !address) return;

    try {
      const { paths: sorPaths } =
        await balancerApi.sorSwapPaths.fetchSorSwapPaths({
          chainId: CHAIN_ID,
          tokenIn: token1.address,
          tokenOut: token2.address,
          swapKind: SwapKind.GivenIn,
          swapAmount,
        });

      const swap = new Swap({
        chainId: CHAIN_ID,
        paths: sorPaths,
        swapKind: SwapKind.GivenIn,
        userData: "0x",
      });

      const queryOutput = await swap.query(RPC_URL);

      setSwapObject({ swap, queryOutput: queryOutput as ExactInQueryOutput });

      return { swap, queryOutput };
    } catch (error) {
      console.error(error);
    }
  }, [token1, token2, isConnected, address]);

  const swap = async () => {
    if (!isConnected || !address || !swapObject) return;
    try {
      const slippage = Slippage.fromPercentage("1");
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60);

      const { swap, queryOutput } = swapObject;

      const callData = swap.buildCall({
        slippage,
        deadline,
        queryOutput,
        sender: address,
        recipient: address,
        wethIsEth: false,
      });

      const tokenAbi = [
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
      ];

      await writeContractAsync({
        abi: tokenAbi,
        functionName: "approve",
        address: token1.address,
        args: [callData.to, swapAmount.amount],
      });

      await sendTransactionAsync({
        to: callData.to,
        data: callData.callData,
        value: callData.value,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const price = useCallback(async (token: Token) => {
    const url = `https://api.dexscreener.com/latest/dex/tokens/${token.address}?dexId=beraswap`;
    const response = await fetch(url);
    const data = await response.json();
    const sorted = data.pairs
      .filter((pair: any) => pair.dexId === "beraswap")
      .sort((a: any, b: any) => b.liquidity.usd - a.liquidity.usd);

    return sorted[0].priceUsd;
  }, []);

  const reverseSwap = async () => {
    if (loadingPreview) return;

    setToken1(token2);
    setToken2(token1);
    const amount = TokenAmount.fromHumanAmount(token2, swapObject?.queryOutput.expectedAmountOut.toSignificant() as `${number}` ?? "0" as `${number}`)
    setSwapAmount(amount);

    setLoadingPreview(true);

    await preview(amount, token1, token2);

    setLoadingPreview(false);
  };

  const debouncedSetSwapAmount = useCallback(
    debounce(async (amount: `${number}`) => {
      if (Number(amount) === 0) {
        setSwapAmount(TokenAmount.fromHumanAmount(token1, "0"));
        setSwapObject(null);
        return;
      };
      setLoadingPreview(true);

      setSwapAmount(TokenAmount.fromHumanAmount(token1, amount));

      await preview(TokenAmount.fromHumanAmount(token1, amount), token1, token2);

      const price1 = await price(token1);
      const price2 = await price(token2);

      setToken1Price(price1);
      setToken2Price(price2);
      setLoadingPreview(false);
    }, 300),
    [token1, preview, price]
  );


  return {
    setSwapAmount: debouncedSetSwapAmount,
    swap,
    token1Price,
    token2Price,
    reverseSwap,
    swapObject,
    swapAmount,
    loadingPreview,
    token1,
    token2,
    slippage,
    deadline,
    setSlippage,
    setDeadline,
  };
};
