"use client";

import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-12 max-w-7xl"
    >
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-default to-secondary bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-foreground-secondary mt-2">
          Please read these terms carefully before using our service
        </p>
      </div>

      {/* Important Notice Card */}
      <Card className="mb-8 relative overflow-hidden bg-surface/30 backdrop-blur-sm border-2 border-primary-default/20 hover:border-primary-default/40 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-default/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="relative p-6 flex items-start gap-4">
          <InfoCircledIcon className="w-6 h-6 text-primary-default flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-foreground-primary mb-2">Important Notice</h3>
            <p className="text-foreground-secondary">
              BeraFlowDao is a DAO forged through the innovative Proof-of-Liquidity (POL) mechanism of Berachain. 
              By using our services, you acknowledge the risks associated with DeFi protocols and blockchain technology.
            </p>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden bg-surface/30 backdrop-blur-sm border-2 border-border/40 hover:border-border transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-default/5 via-transparent to-secondary/5 pointer-events-none" />
        
        <div className="relative p-8 space-y-8 text-foreground-secondary">
          <section>
            <h2 className="text-xl font-semibold text-foreground-primary mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using this website and BeraFlowDao services, you accept and agree to be bound by the terms
              and provision of this agreement. This includes all DeFi functionalities such as staking, swapping, and treasury participation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground-primary mb-4">2. Platform Services</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                BeraFlowDao provides the following core services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Staking of BGT tokens for rewards and governance participation</li>
                <li>Token swapping functionality through Berachain's infrastructure</li>
                <li>Treasury management and participation</li>
                <li>Sale participation opportunities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground-primary mb-4">3. Risks and Disclaimers</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                The materials and services on this website are provided on an 'as is' basis. You acknowledge that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>DeFi protocols carry inherent risks including but not limited to smart contract vulnerabilities</li>
                <li>Cryptocurrency values are highly volatile and can result in losses</li>
                <li>Transaction fees and network conditions may affect service availability</li>
                <li>Past performance does not guarantee future results</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground-primary mb-4">4. Limitations</h2>
            <p className="leading-relaxed">
              In no event shall BeraFlowDao or our suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials or services on our
              platform. This includes any failures in the Berachain network or related smart contracts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground-primary mb-4">5. User Obligations</h2>
            <div className="space-y-4">
              <p className="leading-relaxed">
                As a user of BeraFlowDao, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain the security of your wallet and private keys</li>
                <li>Conduct due diligence before participating in any platform activities</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in any malicious or harmful activities on the platform</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground-primary mb-4">6. Governance</h2>
            <p className="leading-relaxed">
              BeraFlowDao operates through a decentralized governance model. Token holders may
              participate in governance decisions according to the established voting mechanisms
              and protocols.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground-primary mb-4">7. Modifications</h2>
            <p className="leading-relaxed">
              We may revise these terms of service at any time without notice. Changes may be
              implemented through governance proposals. By continuing to use this website and our
              services, you are agreeing to be bound by the current version of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground-primary mb-4">8. Governing Law</h2>
            <p className="leading-relaxed">
              These terms and conditions are governed by and construed in accordance with
              applicable laws, and any disputes relating to these terms and conditions
              will be subject to the exclusive jurisdiction of the courts.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t-2 border-border/40">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-foreground-secondary">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <div className="flex gap-4 text-sm">
                <Link 
                  href="https://beraflowdao.gitbook.io/beraflowdao" 
                  target="_blank"
                  className="text-primary-default hover:text-primary-hover transition-colors"
                >
                  Documentation
                </Link>
                <span className="text-border">•</span>
                <Link 
                  href="/privacy-notice" 
                  className="text-primary-default hover:text-primary-hover transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TermsOfService;
