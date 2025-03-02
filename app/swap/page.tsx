"use client";

import { WalletGuard } from "@/shared/components/WalletGuard";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { ArrowDownIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSwap } from "../../features/swap/useSwap";
import { Spinner } from "@heroui/spinner";
import Image from "next/image";
import { getTokenImageUrl } from "@/shared/utils";
import { SwapSettings } from "./swap_settings";
import { getBalance } from "wagmi/actions";
import { useAccount } from "wagmi";
import { wagmiConfig } from "@/config/wagmi";
import { Alert } from "@heroui/alert";
import { useApprove } from "@/shared/hooks/useApprove";
import { U256_MAX } from "@/config/berachain";
import { createApproveToast, createSwapToast } from "./toasts";

export default function SwapPage() {
  const { address } = useAccount();

  const [inputAmount, setInputAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isApproving, setIsApproving] = useState(false);

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
    isAllowanceNeeded,
    setIsAllowanceNeeded,
  } = useSwap();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSwap = async () => {
    setIsLoading(true);
    const promise = swap().then(() => {
      return getBalance(wagmiConfig, {
        token: token1.address,
        address: address as `0x${string}`,
      }).then((token1Balance) => {
        setToken1Balance(
          +token1Balance.value.toString() / 10 ** token1.decimals
        );
      });
    });

    createSwapToast(
      promise,
      swapAmount.toSignificant(),
      token1.symbol ?? "",
      token2.symbol ?? "",
      swapObject?.queryOutput.expectedAmountOut.toSignificant() ?? "0"
    );

    promise
      .then(() => {
        setSwapAmount(`0`);
        setInputAmount("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const token1UsdValue = +swapAmount.toSignificant() * token1Price;
  const token2UsdValue =
    +(swapObject?.queryOutput.expectedAmountOut.toSignificant() || 0) *
    token2Price;

  useEffect(() => {
    if (!address) return;

    getBalance(wagmiConfig, {
      token: token1.address,
      address: address as `0x${string}`,
    }).then((token1Balance) => {
      const balance = +token1Balance.value.toString() / 10 ** token1.decimals;
      setToken1Balance(+token1Balance.value.toString() > 1e2 ? balance : 0);
    });
  }, [token1, address]);

  useEffect(() => {
    if (!loadingPreview) {
      inputRef.current?.focus();
    }
  }, [loadingPreview]);

  const { approve } = useApprove();

  const handleApprove = async (infinite?: boolean) => {
    setIsApproving(true);
    const promise = approve(
      swapObject?.queryOutput.to as `0x${string}`,
      infinite ? U256_MAX : swapAmount.amount,
      token1
    ) as Promise<void>;

    createApproveToast(
      promise,
      token1.symbol ?? "",
      swapAmount.toSignificant(),
      infinite ?? false
    );

    await promise
      .then(() => {
        setIsAllowanceNeeded(false);
      })
      .finally(() => {
        setIsApproving(false);
      });
  };
  console.log(token1Balance)
  const isInsufficientFunds = +inputAmount > token1Balance;

  const showApprove = isAllowanceNeeded && !isInsufficientFunds;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[520px] min-h-[520px] w-full mx-auto flex flex-col gap-8 mt-4 justify-center py-8"
    >
      <WalletGuard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-border/40 shadow-xl p-6 w-full hover:border-primary-default/40 transition-all duration-300"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <div className="space-y-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-default to-primary-hover bg-clip-text text-transparent">
                  Swap Tokens
                </span>
                <p className="text-sm text-foreground-secondary">
                  Exchange your tokens instantly
                </p>
              </div>
              <SwapSettings
                onSlipageChange={setSlippage}
                onDeadlineChange={setDeadline}
                slippage={slippage}
                deadline={deadline}
              />
            </div>

            {/* Input token */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground-secondary">
                You pay
              </label>
              <motion.div className="p-4 py-5 relative rounded-xl flex bg-surface/50 border border-border/40 transition-all duration-300 hover:border-border">
                <input
                  type="number"
                  autoFocus
                  value={inputAmount}
                  ref={inputRef}
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

                {inputAmount && (
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
                    ~ ${token2UsdValue}
                  </span>
                )}
              </motion.div>
            </div>

            {isInsufficientFunds && (
              <Alert
                color="danger"
                className="bg-danger"
                title={<span className="text-white">Insufficient funds</span>}
                description={
                  <span className="text-white">
                    You don`t have enough funds to swap
                  </span>
                }
              />
            )}

            {/* Price info */}
            <motion.div className="p-3 rounded-xl bg-surface/50 border border-border/40 transition-all duration-300 hover:border-border/60">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-foreground-secondary">
                  Price impact
                </span>
                <span
                  className={`font-bold text-sm font-mono ${
                    +priceImpact.priceImpact * 100 > 0.5
                      ? "text-error"
                      : "text-success"
                  }`}
                >
                  {(+priceImpact.priceImpact * 100).toFixed(4)}%
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-xs text-foreground-secondary">
                  Slippage tolerance
                </span>
                <span className="font-bold text-sm font-mono text-foreground-primary">
                  {(+slippage).toFixed(2)}%
                </span>
              </div>
              <Divider className="my-3 bg-border/40" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-foreground-secondary">Route</span>
                <span className="font-bold text-sm font-mono text-foreground-primary flex gap-2">
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
            {showApprove && (
              <div className="flex flex-col gap-2">
                <Button
                  variant="solid"
                  isLoading={isApproving}
                  onPress={() => handleApprove()}
                  className="w-full font-bold bg-primary-default hover:bg-primary-hover transition-all duration-300 h-12 text-sm shadow-md border-none rounded-xl"
                >
                  Approve {token1.symbol}
                </Button>
                <Button
                  variant="bordered"
                  isLoading={isApproving}
                  onPress={() => handleApprove(true)}
                  className="w-full font-bold transition-all duration-300 h-12 text-sm shadow-md rounded-xl"
                >
                  Approve Infinite
                </Button>
              </div>
            )}
            {!showApprove && (
              <Button
                className="w-full font-bold cursor-pointer bg-primary-default hover:bg-primary-hover transition-all duration-300 h-12 text-sm shadow-md border-none rounded-xl"
                onPress={handleSwap}
                isDisabled={
                  !inputAmount ||
                  +inputAmount === 0 ||
                  isLoading ||
                  isInsufficientFunds
                }
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="text-xl"
                  >
                    ⭐
                  </motion.div>
                ) : (
                  "Swap"
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </WalletGuard>
    </motion.div>
  );
}
