'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';

export const WalletGuard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return children;
  }

  return (
    <div className={'relative ' + className}>
      <div className="opacity-20 pointer-events-none blur-[1px] transition-all duration-300">{children}</div>
      <motion.div
        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-surface/40 flex flex-col rounded-xl items-center justify-center gap-6 z-50 border border-white/10 shadow-lg"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.4,
            type: 'spring',
            stiffness: 100,
          }}
          className="text-center relative"
        >
          <motion.div className="relative space-y-4 px-8 py-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-md">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <h3 className="text-h3 font-bold text-white">Connect Your Wallet</h3>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-foreground-secondary/90 max-w-[300px] mx-auto leading-relaxed"
            >
              Connect your wallet to unlock exclusive features and access this content
            </motion.p>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 flex justify-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                animate={{
                  scale: [1, 1.04, 1],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.5,
                  ease: 'easeInOut',
                }}
              >
                <ConnectButton />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
