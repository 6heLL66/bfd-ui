"use client";

import { usdcToken } from "@/config/berachain";
import { WalletGuard } from "@/shared/components/WalletGuard";
import { getTokenImageUrl } from "@/shared/utils";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Sale = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[800px] min-h-[600px] w-full mx-auto flex flex-col gap-8 justify-between py-8"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Alert
          color="default"
          className="dark h-auto backdrop-blur-sm bg-surface border-2 border-border/40 shadow-xl"
          title={
            <span className="text-body font-bold text-foreground-primary">
              There is no active sale now.
            </span>
          }
          description={
            <span className="text-text font-bold text-foreground-secondary">
              Announcement will be made in discord when the next sale starts.
            </span>
          }
        />
      </motion.div>

      <WalletGuard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-8 py-12 w-full hover:border-primary-default/40 transition-all duration-300"
        >
          <div className="flex flex-col gap-8 w-full">
            <div className="flex items-center justify-between border-b-2 border-border/40 pb-6">
              <div className="space-y-1">
                <span className="text-h3 font-bold text-primary-default">
                  Supply USDC
                </span>
                <p className="text-sm text-foreground-secondary">
                  Participate in the active sale round
                </p>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-default/20 text-primary-default border-2 border-primary-default/40">
                Active sale
              </span>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-foreground-secondary">
                      Price
                    </span>
                    <span className="font-bold text-lg text-foreground-primary">
                      1.00 USDC
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-foreground-secondary">
                      Cap
                    </span>
                    <span className="font-bold text-lg text-foreground-primary">
                      1,000,000 USDC
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-foreground-secondary">
                      Total raised
                    </span>
                    <span className="font-bold text-lg text-foreground-primary">
                      0 USDC
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-foreground-secondary">
                      Your allocation
                    </span>
                    <span className="font-bold text-lg text-foreground-primary">
                      1,000 USDC
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col justify-center gap-5">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground-secondary">
                    Amount to supply
                  </label>
                  <motion.div className="p-3 py-3 relative rounded-xl flex bg-surface/50 border border-border/40 transition-all duration-300 hover:border-border">
                    <input
                      className="w-full bg-transparent border-none"
                      placeholder="Enter USDC amount"
                      type="number"
                    />

                    <div className="flex items-center">
                      <Divider
                        className="h-8 mx-2 bg-border/40"
                        orientation="vertical"
                      />
                      <span className="text-foreground-secondary font-medium flex gap-2 w-20 items-center">
                        <Image
                          src={getTokenImageUrl(usdcToken)}
                          alt="usdc"
                          width={24}
                          height={24}
                        />
                        USDC
                      </span>
                    </div>
                  </motion.div>

                  <p className="text-xs text-foreground-secondary">
                    Available balance: 2,500 USDC
                  </p>
                </div>
                <Button className="w-full font-bold bg-gradient-to-r from-primary-default to-primary-hover hover:opacity-90 transition-all duration-300 h-12 text-base shadow-xl shadow-primary-default/20 border-2 border-primary-default/40">
                  Supply USDC
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </WalletGuard>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-6 mt-4"
      >
        <div className="flex flex-col gap-4">
          <span className="text-body font-bold text-foreground-primary">
            Previous sales
          </span>
          <Card className="max-w-[300px] bg-surface backdrop-blur-xl border-2 border-border/40 font-display mt-2 p-1 hover:border-primary-default/40 transition-all duration-300 shadow-xl">
            <CardHeader className="flex gap-3">
              <div className="flex justify-between w-full">
                <span className="text-foreground-primary font-medium">
                  Sale Round #1
                </span>
                <span className="text-xs text-foreground-secondary border-2 border-border bg-border/40 px-2 py-1 rounded-full">
                  Feb 23
                </span>
              </div>
            </CardHeader>
            <Divider className="bg-border/40" />
            <CardBody className="flex flex-col gap-4">
              <div className="flex w-full justify-between">
                <span className="text-sm text-foreground-secondary">Price</span>
                <span className="text-foreground-primary font-bold">
                  1.00 USDC
                </span>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-sm text-foreground-secondary">Cap</span>
                <span className="text-foreground-primary font-bold">
                  1,000,000 USDC
                </span>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-sm text-foreground-secondary">
                  Total raised
                </span>
                <span className="text-foreground-primary font-bold">
                  1,000,000 USDC
                </span>
              </div>
            </CardBody>
            <Divider className="bg-border/40" />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                className="text-primary-default hover:text-primary-hover transition-colors duration-300"
                href="https://github.com/heroui-inc/heroui"
              >
                View sale report
              </Link>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sale;
