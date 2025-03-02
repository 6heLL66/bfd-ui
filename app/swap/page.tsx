"use client";

import { WalletGuard } from "@/shared/components/WalletGuard";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSwap } from "../../features/swap/useSwap";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import { getTokenImageUrl } from "@/shared/utils";
import { SwapSettings } from "./swap_settings";
import { getBalance } from "wagmi/actions";
import { useAccount } from "wagmi";
import { wagmiConfig } from "@/config/wagmi";
import { Alert } from "@heroui/alert";

export default function SwapPage() {
  const { address } = useAccount();

  const [inputAmount, setInputAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [token1Balance, setToken1Balance] = useState(0);

  const {
    swap,
    setSwapAmount,
    swapAmount,
    token1,
    token2,
    token1Price,
    token2Price,
    swapObject,
    loadingPreview,
    reverseSwap,
    slippage,
    deadline,
    setSlippage,
    setDeadline,
    priceImpact,
  } = useSwap();

  const handleSwap = async () => {
    setIsLoading(true);

    await swap();

    setIsLoading(false);
  };

  const token1UsdValue = +swapAmount.toSignificant() * token1Price;
  const token2UsdValue = +(swapObject?.queryOutput.expectedAmountOut.toSignificant() || 0) * token2Price;

  useEffect(() => {
    if (!address) return;

    getBalance(wagmiConfig, {token: token1.address, address: address as `0x${string}`}).then((token1Balance) => {
      setToken1Balance(+token1Balance.value.toString() / 10 ** token1.decimals);
    });
  }, [token1, address]);

  const isInsufficientFunds = +swapAmount.toSignificant() > token1Balance;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[650px] min-h-[650px] w-full mx-auto flex flex-col gap-10 justify-center py-12"
    >
      <WalletGuard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-surface/80 backdrop-blur-xl rounded-3xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-8 w-full hover:border-primary-default/40 transition-all duration-300"
        >
          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center justify-between border-b-2 border-border/40 pb-6">
              <div className="space-y-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-primary-default via-primary-hover to-secondary bg-clip-text text-transparent">
                  Swap Tokens
                </span>
                <p className="text-base text-foreground-secondary">
                  Exchange your tokens instantly
                </p>
              </div>
              <div className="flex items-center gap-4">
                <SwapSettings
                  onSlipageChange={setSlippage}
                  onDeadlineChange={setDeadline}
                  slippage={slippage}
                  deadline={deadline}
                />
                <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary-default/20 text-primary-default border border-primary-default/40">
                  Best price
                </span>
              </div>
            </div>

            {/* Input token */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground-secondary">
                You pay
              </label>
              <motion.div className="p-4 py-5 relative rounded-2xl flex  bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border hover:shadow-lg relative">
                <input
                  type="number"
                  autoFocus
                  value={inputAmount}
                  onChange={(e) => {
                    setSwapAmount(e.target.value as `${number}`);
                    setInputAmount(e.target.value);
                  }}
                  disabled={loadingPreview}
                  className="border-none bg-transparent text-lg grow font-mono"
                  placeholder="Enter amount"
                />

                <div className="flex items-center gap-2">
                  <button
                  onClick={() => {
                    setSwapAmount(token1Balance.toString() as `${number}`);
                    setInputAmount(token1Balance.toString());
                  }}
                    className="px-2 absolute right-0 -top-8 py-1 text-xs font-bold rounded-lg bg-primary-default/20 text-primary-default hover:bg-primary-default/30 transition-colors"
                  >
                    MAX {token1Balance}
                  </button>
                  <Divider
                    className="h-8 mx-3 bg-border/40"
                    orientation="vertical"
                  />
                  <span className="text-text font-bold flex gap-3 items-center">
                    <Image
                      src={getTokenImageUrl(token1)}
                      width={28}
                      height={28}
                      alt="honey"
                    />{" "}
                    {token1.symbol}
                  </span>
                </div>

                {inputAmount !== "0" && (
                  <span className="text-[11px] font-regular font-mono font-bold absolute left-4 bottom-2 opacity-50">
                    ~ ${token1UsdValue}
                  </span>
                )}
              </motion.div>
            </div>

            {/* Swap arrow */}
            <div className="flex justify-center py-2">
              <motion.button
                className="p-3 rounded-full bg-primary-default/20 hover:bg-primary-default/30 transition-colors border border-primary-default/40"
                onClick={reverseSwap}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowDownIcon className="h-4 w-4 text-primary-default" />
              </motion.button>
            </div>

            {/* Output token */}
            <div className="space-y-3 -mt-8">
              <label className="text-sm font-medium text-foreground-secondary">
                You receive
              </label>
              <motion.div className="p-4 py-5 rounded-2xl flex bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border hover:shadow-lg">
                <input
                  type="number"
                  disabled
                  value={
                    swapObject?.queryOutput.expectedAmountOut.toSignificant() ??
                    ""
                  }
                  className="border-none bg-transparent text-lg grow font-mono"
                  placeholder="0.00"
                />

                <div className="flex items-center">
                  <Divider
                    className="h-8 mx-3 bg-border/40"
                    orientation="vertical"
                  />
                  <span className="text-text font-bold flex gap-3 items-center">
                    <Image
                      src={getTokenImageUrl(token2)}
                      width={28}
                      height={28}
                      alt="honey"
                    />
                    {token2.symbol}
                  </span>
                </div>

                {loadingPreview && (
                  <div className="absolute inset-0 z-10000 w-full h-full flex items-center justify-center bg-surface/20 backdrop-blur-[800px] rounded-2xl">
                    <Spinner size="md" />
                  </div>
                )}

                {swapObject?.queryOutput.expectedAmountOut.toSignificant() && (
                  <span className="text-[11px] font-regular font-mono font-bold absolute left-4 bottom-1 opacity-50">
                    ~ $
                    {token2UsdValue}
                  </span>
                )}
              </motion.div>
            </div>


            {isInsufficientFunds && <Alert color='danger' className="bg-danger" title={<span className="text-white">Insufficient funds</span>} description={<span className="text-white">You don't have enough funds to swap</span>} />}

            {/* Price info */}
            <motion.div className="p-4 rounded-2xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-foreground-secondary">
                  Price impact
                </span>
                <span className={`font-bold text-base text-foreground-primary font-mono ${(+priceImpact.priceImpact * 100) > 0.5 ? 'text-error' : 'text-success'}`}>
                {(+priceImpact.priceImpact * 100).toFixed(4)}%
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-sm text-foreground-secondary">
                  Slippage tolerance
                </span>
                <span className="font-bold text-base font-mono text-foreground-primary">
                  {(+slippage).toFixed(2)}%
                </span>
              </div>
              <Divider className="my-3 bg-border/40" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-foreground-secondary">Route</span>
                <span className="font-bold text-base text-foreground-primary flex gap-2">
                  <span className="text-text font-bold flex gap-3 items-center">
                    <Image
                      src={getTokenImageUrl(token1)}
                      width={28}
                      height={28}
                      alt="honey"
                    />
                    {token1.symbol}
                  </span>{" "}
                  <ArrowRightIcon className="h-6 w-8 text-white" />
                  <span className="text-text font-bold flex gap-3 items-center">
                    <Image
                      src={getTokenImageUrl(token2)}
                      width={28}
                      height={28}
                      alt="honey"
                    />
                    {token2.symbol}
                  </span>
                </span>
              </div>
            </motion.div>

            {/* Swap button */}
            <Button
              className="w-full font-bold cursor-pointer bg-gradient-to-r from-primary-default to-primary-hover hover:opacity-90 transition-all duration-300 h-14 text-base shadow-xl shadow-primary-default/20 border border-primary-default/40 rounded-xl"
              onPress={handleSwap}
              isDisabled={!inputAmount || isLoading || isInsufficientFunds}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-xl"
                >
                  ⭐
                </motion.div>
              ) : (
                "Swap"
              )}
            </Button>
          </div>
        </motion.div>
      </WalletGuard>
    </motion.div>
  );
}
