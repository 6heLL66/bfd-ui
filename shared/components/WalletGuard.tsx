"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export const WalletGuard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return children;
  }

  return (
    <div className={'relative ' + className}>
      <div className="opacity-30 pointer-events-none">
        {children}
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='absolute inset-0 backdrop-blur-[6px] bg-surface/50 flex flex-col rounded-lg items-center justify-center gap-4 z-50'
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-3"
        >
          <h3 className="text-h3 font-bold bg-gradient-to-r from-primary-default to-primary-hover bg-clip-text text-transparent">
            Connect Wallet
          </h3>
          <p className="text-sm text-foreground-secondary max-w-[280px] mx-auto">
            Please connect your wallet to access this content
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 flex justify-center"
          >
            <ConnectButton />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};