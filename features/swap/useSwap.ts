
import { honeyToken, tokenAbi } from "@/config/berachain";
import { balancerApi, CHAIN_ID, RPC_URL, usdcToken } from "@/config/berachain";
import {
  ExactInQueryOutput,
  Slippage,
  Swap,
  SwapKind,
  Token,
  TokenAmount,
} from "@berachain-foundation/berancer-sdk";
import { useState, useCallback, useEffect } from "react";
import { useAccount, useReadContract, useSendTransaction, useWriteContract } from "wagmi";
import { debounce } from "lodash";
import { useSwapSettings } from "./store/swapSettings";
import { getTokensPrice } from "@/shared/api/berachain";
import { readContract } from "wagmi/actions";
import { wagmiConfig } from "@/config/wagmi";

export const slippageOptions = ["0.1", "1.0", "2.5"];

export const useSwap = () => {
  const [token1, setToken1] = useState<Token>(usdcToken);
  const [token2, setToken2] = useState<Token>(honeyToken);

  const { slippage, deadline, setSlippage, setDeadline } = useSwapSettings();

  const [token1Price, setToken1Price] = useState<number>(0);
  const [token2Price, setToken2Price] = useState<number>(0);
  const [priceImpact, setPriceImpact] = useState<{
    error: string | null;
    priceImpact: string;
  }>({
    error: null,
    priceImpact: "0",
  });
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

  useEffect(() => {
    getTokensPrice([token1.address, token2.address]).then((prices) => {
      if (!prices) return;
      setToken1Price(prices[0].price);
      setToken2Price(prices[1].price);
    });
  }, [token1, token2])

  const preview = useCallback(async (swapAmount: TokenAmount, token1: Token, token2: Token) => {
    if (!isConnected || !address) return;

    try {
      const { paths: sorPaths, priceImpact } =
        await balancerApi.sorSwapPaths.fetchSorSwapPaths({
          chainId: CHAIN_ID,
          tokenIn: token1.address,
          tokenOut: token2.address,
          swapKind: SwapKind.GivenIn,
          swapAmount,
        });

      setPriceImpact(priceImpact);

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

      const allowance = await readContract(wagmiConfig, {
        abi: tokenAbi,
        functionName: "allowance",
        address: token1.address,
        args: [address,callData.to],
      }) as bigint;

      if (!allowance || allowance < swapAmount.amount) {
        await writeContractAsync({
          abi: tokenAbi,
          functionName: "approve",
          address: token1.address,
          args: [callData.to, swapAmount.amount],
        });
      }

      await sendTransactionAsync({
        to: callData.to,
        data: callData.callData,
        value: callData.value,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const reverseSwap = async () => {
    if (loadingPreview) return;

    setToken1(token2);
    setToken2(token1);
    
    setToken1Price(token2Price);
    setToken2Price(token1Price);

    setLoadingPreview(true);

    await preview(swapAmount, token1, token2);

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
      setLoadingPreview(false);
    }, 300),
    [token1, preview]
  );


  return {
    setSwapAmount: debouncedSetSwapAmount,
    swap,
    token1Price,
    token2Price,
    reverseSwap,
    priceImpact,
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
