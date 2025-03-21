'use client';

import { usdcToken, SALE_CA } from '@/config/berachain';
import { WalletGuard } from '@/shared/components/WalletGuard';
import { getTokenImageUrl } from '@/shared/utils';
import { Alert } from '@heroui/alert';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader, CardFooter } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Link } from '@heroui/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSaleContract } from '@/features/sale/useSaleContract';
import { useEffect, useState, useMemo } from 'react';
import { getBalance } from 'wagmi/actions';
import { wagmiConfig } from '@/config/wagmi';
import { useAccount } from 'wagmi';
import { TokenAmount } from '@berachain-foundation/berancer-sdk';
import { toast } from 'react-toastify';
import { useApprove } from '@/shared/hooks/useApprove';
import { InfoCard } from './InfoCard';
import { Tooltip } from '@heroui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { createApproveToast } from '@/app/swap/toasts';

export function SaleClient() {
  const { address } = useAccount();
  const { checkAllowance, approve } = useApprove();
  const [isSupplying, setIsSupplying] = useState<boolean>(false);
  const [supplyValue, setSupplyValue] = useState<string>();
  const [usdcBalance, setUsdcBalance] = useState<number>();
  const { isSaleActive, cap, isPublicSale, totalRaised, allocation, supply } = useSaleContract();

  const progress = useMemo(() => {
    if (!cap || !totalRaised) return 0;
    return (Number(totalRaised.toSignificant()) / Number(cap.toSignificant())) * 100;
  }, [cap, totalRaised]);

  const refreshBalance = async () => {
    if (!address) return;

    getBalance(wagmiConfig, {
      token: usdcToken.address,
      address: address as `0x${string}`,
    }).then(token1Balance => {
      const balance = +token1Balance.value.toString() / 10 ** usdcToken.decimals;
      setUsdcBalance(+token1Balance.value.toString() > 1e2 ? balance : 0);
    });
  };

  const handleSupply = async () => {
    if (!supplyValue) return;
    setIsSupplying(true);
    const amount = TokenAmount.fromHumanAmount(usdcToken, supplyValue as `${number}`);

    const needApprove = await checkAllowance(SALE_CA, amount.amount, usdcToken);

    if (needApprove) {
      const promise = approve(SALE_CA, amount.amount, usdcToken) as Promise<void>;

      createApproveToast(promise, usdcToken.symbol ?? '', amount.toSignificant(), false);

      await promise.catch(() => {
        setIsSupplying(false);

        throw new Error('Failed to approve');
      });
    }

    const promise = supply(amount.amount)
      .then(() => {
        setSupplyValue('');
        refreshBalance();
      })
      .finally(() => {
        setIsSupplying(false);
      });

    toast.promise(promise, {
      pending: 'Supplying USDC...',
      success: 'USDC supplied successfully',
      error: 'Failed to supply USDC',
    });
  };

  useEffect(() => {
    if (!address) return;

    refreshBalance();
  }, [address]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-[800px] min-h-[600px] w-full mx-auto flex flex-col gap-8 justify-between py-8 px-4 md:px-8">
      {!isSaleActive && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Alert
            color="default"
            className="dark h-auto backdrop-blur-sm bg-surface border-2 border-border/40 shadow-xl"
            title={<span className="text-body font-bold text-foreground-primary">There is no active sale now.</span>}
            description={<span className="text-text font-bold text-foreground-secondary">An announcement with the date of the next sale will be made on our socials.</span>}
          />
        </motion.div>
      )}

      <WalletGuard>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-surface backdrop-blur-xl rounded-2xl border-2 border-border/40 shadow-2xl shadow-primary-default/10 p-4 md:p-8 py-8 md:py-12 w-full hover:border-primary-default/40 transition-all duration-300"
        >
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-border/40 pb-6 gap-4 md:gap-0">
              <div className="space-y-1">
                <span className="text-h3 font-bold text-primary-default">Supply USDC</span>
                <p className="text-sm text-foreground-secondary">Participate in the active sale round</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {isSaleActive && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary-default/20 text-primary-default border-2 border-primary-default/40">Active sale</span>
                )}
                {isSaleActive && (
                  <Tooltip
                    className="dark max-w-[300px]"
                    content={
                      isPublicSale
                        ? 'Anyone can participate in the public sale round'
                        : 'Only users with allocation can participate in this stage. Public sale will be available soon'
                    }
                  >
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-success/20 text-success border-2 border-success/40 cursor-help flex items-center gap-1">
                      {isPublicSale ? 'Public sale' : 'Whitelist sale'}
                      <InfoCircledIcon className="w-4 h-4" />
                    </span>
                  </Tooltip>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <InfoCard title="Price" value="1.00 USDC" gradientFrom="purple-600" isSaleActive={isSaleActive} />

                <InfoCard
                  title="Cap"
                  value={isSaleActive && cap ? 
                    <span>
                      {(+cap.toSignificant()).toLocaleString()} $BFD 
                      <span className="text-foreground-secondary text-sm ml-1 opacity-70">
                        (${(+cap.toSignificant()).toLocaleString()} USDC)
                      </span>
                    </span> : '-'
                  }
                  gradientFrom="indigo-600"
                  isSaleActive={isSaleActive}
                />

                <InfoCard
                  title="Remaining"
                  value={isSaleActive && cap && totalRaised ? 
                    <span>
                      {(+cap.sub(totalRaised).toSignificant()).toLocaleString()} $BFD 
                      <span className="text-foreground-secondary text-sm ml-1 opacity-70">
                        (${(+cap.sub(totalRaised).toSignificant()).toLocaleString()} USDC)
                      </span>
                    </span> : '-'
                  }
                  gradientFrom="emerald-600"
                  isSaleActive={isSaleActive}
                  progressBar={{
                    progress: 100 - progress,
                    label: `${(100 - progress).toFixed(1)}% remaining`,
                    color: 'green',
                  }}
                />

                <InfoCard
                  title="Your allocation"
                  value={isSaleActive && allocation ? 
                    <span>
                      {(+allocation.toSignificant()).toLocaleString()} $BFD 
                      <span className="text-foreground-secondary text-sm ml-1 opacity-70">
                        (${(+allocation.toSignificant()).toLocaleString()} USDC)
                      </span>
                    </span> : '-'
                  }
                  gradientFrom="amber-600"
                  isSaleActive={isSaleActive}
                />
              </div>

              <div className="flex flex-col gap-5">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground-secondary">Amount to supply</label>
                  <motion.div className="p-3 py-3 relative rounded-xl flex bg-surface/50 border border-border/40 transition-all duration-300 hover:border-border">
                    <input
                      className="w-full bg-transparent border-none"
                      placeholder="Enter USDC amount"
                      value={supplyValue ?? ''}
                      onChange={e => setSupplyValue(e.target.value)}
                      type="number"
                    />

                    <div className="flex items-center">
                      <Divider className="h-8 mx-2 bg-border/40" orientation="vertical" />
                      <span className="text-foreground-secondary font-medium flex gap-2 w-20 items-center">
                        <Image src={getTokenImageUrl(usdcToken)} alt="usdc" width={24} height={24} />
                        USDC
                      </span>
                    </div>
                  </motion.div>

                  <Button className="text-xs text-foreground-secondary bg-transparent border-2 border-border/40">Available balance: {usdcBalance} USDC</Button>
                </div>
                <Button
                  isDisabled={usdcBalance === 0 || !isSaleActive}
                  isLoading={isSupplying}
                  onPress={handleSupply}
                  className="w-full font-bold bg-gradient-to-r from-primary-default to-primary-hover hover:opacity-90 transition-all duration-300 h-12 text-base shadow-xl shadow-primary-default/20 border-2 border-primary-default/40"
                >
                  Supply USDC
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </WalletGuard>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col gap-6 mt-4">
        <div className="flex flex-col gap-4">
          <span className="text-body font-bold text-foreground-primary">Previous sales</span>
          <Card className="max-w-[300px] bg-surface backdrop-blur-xl border-2 border-border/40 font-display mt-2 p-1 hover:border-primary-default/40 transition-all duration-300 shadow-xl">
            <CardHeader className="flex gap-3">
              <div className="flex justify-between w-full">
                <span className="text-foreground-primary font-medium">Sale Round #1</span>
                <span className="text-xs text-foreground-secondary border-2 border-border bg-border/40 px-2 py-1 rounded-full">Feb 23</span>
              </div>
            </CardHeader>
            <Divider className="bg-border/40" />
            <CardBody className="flex flex-col gap-4">
              <div className="flex w-full justify-between">
                <span className="text-sm text-foreground-secondary">Price</span>
                <span className="text-foreground-primary font-bold">1.00 USDC</span>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-sm text-foreground-secondary">Cap</span>
                <span className="text-foreground-primary font-bold">1,000,000 $BFD ($1,000,000)</span>
              </div>
              <div className="flex w-full justify-between">
                <span className="text-sm text-foreground-secondary">Total raised</span>
                <span className="text-foreground-primary font-bold">1,000,000 USDC</span>
              </div>
            </CardBody>
            <Divider className="bg-border/40" />
            <CardFooter>
              <Link isExternal showAnchorIcon className="text-primary-default hover:text-primary-hover transition-colors duration-300" href="https://github.com/heroui-inc/heroui">
                View sale report
              </Link>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
} 