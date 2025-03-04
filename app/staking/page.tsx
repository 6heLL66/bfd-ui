'use client';

import { motion } from 'framer-motion';
import { WalletGuard } from '@/shared/components/WalletGuard';
import { Card } from '@heroui/react';

const StakingPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-default to-secondary bg-clip-text text-transparent">Stake BGT</h1>
        <p className="text-foreground-secondary mt-2">Stake your BGT tokens to earn rewards and participate in governance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Staking Card */}
        <div className="lg:col-span-2">
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
                    <span className="text-h3 font-bold text-primary-default">Stake BGT</span>
                    <p className="text-sm text-foreground-secondary">Lock your BGT to earn rewards</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">APR</span>
                      <span className="font-bold text-lg text-foreground-primary">12.5%</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">Total Staked</span>
                      <span className="font-bold text-lg text-foreground-primary">1,234,567 BGT</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">Your Stake</span>
                      <span className="font-bold text-lg text-foreground-primary">0 BGT</span>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-xl bg-gradient-to-br from-surface via-border/5 to-border/10 backdrop-blur-sm border-2 border-border/40 transition-all duration-300 hover:border-border/60 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-foreground-secondary">Earned Rewards</span>
                      <span className="font-bold text-lg text-foreground-primary">0 BGT</span>
                    </div>
                  </motion.div>
                </div>

                {/* Staking Input */}
                <div className="space-y-4 mt-4">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="w-full bg-surface/50 border-2 border-border/40 rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:border-primary-default/40 transition-colors"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium bg-primary-default/20 text-primary-default rounded-full hover:bg-primary-default/30 transition-colors">
                      MAX
                    </button>
                  </div>
                  <button className="w-full bg-gradient-to-r from-primary-default to-primary-hover text-black font-bold py-4 rounded-xl hover:opacity-90 transition-opacity">
                    Stake BGT
                  </button>
                </div>
              </div>
            </motion.div>
          </WalletGuard>
        </div>

        {/* Info Card */}
        <Card className="bg-surface backdrop-blur-xl border-2 border-border/40 p-6 space-y-6">
          <h3 className="text-xl font-bold text-foreground-primary">Staking Info</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-foreground-secondary mb-2">Lock Period</h4>
              <p className="text-foreground-primary">7 days minimum lock period for staking BGT tokens</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground-secondary mb-2">Rewards</h4>
              <p className="text-foreground-primary">Earn BGT rewards daily based on your staked amount and the current APR</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground-secondary mb-2">Benefits</h4>
              <ul className="list-disc list-inside text-foreground-primary space-y-2">
                <li>Earn passive income through staking rewards</li>
                <li>Participate in governance decisions</li>
                <li>Access to exclusive features and benefits</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default StakingPage;
