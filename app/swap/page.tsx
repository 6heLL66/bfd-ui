"use client";

import { WalletGuard } from "@/shared/components/WalletGuard";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SwapPage() {
  const [inputAmount, setInputAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSwap = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const outputAmount = inputAmount
    ? (Number(inputAmount) * 0.5).toFixed(2)
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[500px] min-h-[600px] w-full mx-auto flex flex-col gap-8 justify-center py-8 mt-8"
    >
      <WalletGuard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-6 w-full hover:border-primary-default/40 transition-all duration-300"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between border-b-2 border-border/40 pb-4">
              <div className="space-y-1">
                <span className="text-h4 font-bold bg-gradient-to-r from-primary-default via-primary-hover to-secondary bg-clip-text text-transparent">
                  Swap Tokens
                </span>
                <p className="text-xs text-foreground-secondary">
                  Exchange your tokens instantly
                </p>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary-default/20 text-primary-default border border-primary-default/40">
                Best price
              </span>
            </div>

            {/* Input token */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground-secondary">
                You pay
              </label>
              <motion.div className="p-3 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg">
                <Input
                  variant="faded"
                  type="number"
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                  className="dark w-full backdrop-blur-sm bg-surface border border-border/40 focus:border-primary-default/60"
                  placeholder="Enter amount"
                  endContent={
                    <div className="flex items-center">
                      <Divider
                        className="h-6 mx-2 bg-border/40"
                        orientation="vertical"
                      />
                      <span className="text-xs font-medium">USDC</span>
                    </div>
                  }
                />
              </motion.div>
            </div>

            {/* Swap arrow */}
            <div className="flex justify-center">
              <motion.button
                className="p-2 rounded-full bg-primary-default/20 hover:bg-primary-default/30 transition-colors border border-primary-default/40"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowDownIcon className="h-3 w-3 text-primary-default" />
              </motion.button>
            </div>

            {/* Output token */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground-secondary">
                You receive
              </label>
              <motion.div className="p-3 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg">
                <Input
                  variant="faded"
                  type="number"
                  value={outputAmount}
                  readOnly
                  className="dark w-full backdrop-blur-sm bg-surface border border-border/40"
                  placeholder="0.0"
                  endContent={
                    <div className="flex items-center">
                      <Divider
                        className="h-6 mx-2 bg-border/40"
                        orientation="vertical"
                      />
                      <span className="text-xs font-medium">HONEY</span>
                    </div>
                  }
                />
              </motion.div>
            </div>

            {/* Price info */}
            <motion.div className="p-3 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-foreground-secondary">
                  Price Impact
                </span>
                <span className="font-bold text-sm text-foreground-primary">
                  {"< 0.01%"}
                </span>
              </div>
              <Divider className="my-2 bg-border/40" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-foreground-secondary">Route</span>
                <span className="font-bold text-sm text-foreground-primary">
                  USDC → HONEY
                </span>
              </div>
            </motion.div>

            {/* Swap button */}
            <Button
              className="w-full font-bold cursor-pointer bg-gradient-to-r from-primary-default to-primary-hover hover:opacity-90 transition-all duration-300 h-10 text-sm shadow-xl shadow-primary-default/20 border border-primary-default/40"
              onPress={handleSwap}
              disabled={!inputAmount || isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⭐
                </motion.div>
              ) : (
                "Swap Tokens"
              )}
            </Button>
          </div>
        </motion.div>
      </WalletGuard>
    </motion.div>
  );
}
